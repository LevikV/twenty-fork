# Stage 1: Build twenty-front with our DefaultLayout changes
FROM node:24-alpine AS frontend-builder
WORKDIR /build

# Copy monorepo structure (package.json files, configs — NOT node_modules)
COPY packages/twenty-front/package.json packages/twenty-front/
COPY packages/twenty-front/vite.config.ts packages/twenty-front/ 2>/dev/null || true
COPY packages/twenty-front/tsconfig.json packages/twenty-front/ 2>/dev/null || true
COPY packages/twenty-front/index.html packages/twenty-front/ 2>/dev/null || true
COPY packages/twenty-ui/package.json packages/twenty-ui/
COPY packages/twenty-shared/package.json packages/twenty-shared/
COPY packages/twenty-utils/package.json packages/twenty-utils/ 2>/dev/null || true
COPY packages/twenty-client-sdk/package.json packages/twenty-client-sdk/ 2>/dev/null || true
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ .yarn/

# Install dependencies
RUN corepack enable && yarn install --immutable 2>&1 | tail -5

# Copy full source (only twenty-front)
COPY packages/twenty-front/src/ packages/twenty-front/src/
COPY packages/twenty-ui/ packages/twenty-ui/
COPY packages/twenty-shared/ packages/twenty-shared/

# Build frontend
RUN cd packages/twenty-front && npx vite build --outDir dist

# Stage 2: Production image with back + front patches
FROM twentycrm/twenty:latest AS deps-prep
USER root
RUN mkdir -p /deps && cd /deps && npm init -y 2>/dev/null; \
    npm install @nestjs/websockets @nestjs/platform-socket.io socket.io 2>&1 | tail -3

FROM twentycrm/twenty:latest
USER root

# Copy ws runtime deps
COPY --from=deps-prep /deps/node_modules/@nestjs/websockets /app/node_modules/@nestjs/websockets
COPY --from=deps-prep /deps/node_modules/@nestjs/platform-socket.io /app/node_modules/@nestjs/platform-socket.io
COPY --from=deps-prep /deps/node_modules/socket.io /app/node_modules/socket.io
COPY --from=deps-prep /deps/node_modules/engine.io /app/node_modules/engine.io
COPY --from=deps-prep /deps/node_modules/engine.io-parser /app/node_modules/engine.io-parser
COPY --from=deps-prep /deps/node_modules/socket.io-parser /app/node_modules/socket.io-parser
COPY --from=deps-prep /deps/node_modules/socket.io-adapter /app/node_modules/socket.io-adapter
COPY --from=deps-prep /deps/node_modules/@socket.io /app/node_modules/@socket.io
COPY --from=deps-prep /deps/node_modules/ws /app/node_modules/ws
COPY --from=deps-prep /deps/node_modules/cors /app/node_modules/cors
COPY --from=deps-prep /deps/node_modules/base64id /app/node_modules/base64id

# Replace frontend with our build
RUN rm -rf /app/packages/twenty-server/dist/front
COPY --from=frontend-builder /build/packages/twenty-front/dist /app/packages/twenty-server/dist/front

# Backend patches (compiled JS from our repo patches/)
RUN mkdir -p /app/packages/twenty-server/dist/modules/notification
COPY patches/notification.module.js /app/packages/twenty-server/dist/modules/notification/notification.module.js
COPY patches/notification.gateway.js /app/packages/twenty-server/dist/modules/notification/notification.gateway.js
COPY patches/notification.controller.js /app/packages/twenty-server/dist/modules/notification/notification.controller.js
COPY patches/modules.module.js /app/packages/twenty-server/dist/modules/modules.module.js

# Permissions
RUN chown -R node:node /app/packages/twenty-server/dist/modules/notification/ \
    && chown node:node /app/packages/twenty-server/dist/modules/modules.module.js \
    && chown -R node:node /app/packages/twenty-server/dist/front

USER node
