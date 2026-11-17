#!/usr/bin/env bash
#
# release.sh — сборка и деплой образов Twenty CRM (Kplus79).
#
#   ./scripts/release.sh status                  — что сейчас работает
#   ./scripts/release.sh check                   — проверки на текущем контейнере
#   ./scripts/release.sh build <tag>             — собрать образ (без деплоя)
#   ./scripts/release.sh deploy <tag>            — переключить .env на тег и поднять
#   ./scripts/release.sh release <tag>           — build + deploy + check
#   ./scripts/release.sh rollback                — вернуться на предыдущий тег
#
#   --dry-run  — показать, что будет сделано, ничего не выполняя
#
# Требования: собранный фронт берётся из twenty-v37 (Node 26 для 2.58,
# Node 24 для старой ветки), образ собирается из этого репозитория
# (контекст = корень репозитория, Dockerfile — в нём же).
set -euo pipefail

FORK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CORE_DIR="${CORE_DIR:-/opt/twenty-crm/repos/twenty-v37}"
SELF_DIR="${SELF_DIR:-/opt/twenty-crm/self-host}"
# Node для сборки: 2.58 требует ^26.5.1, поэтому по умолчанию берём Node 26.
# Для сборки старой ветки 2.37 передавай NODE_BIN=/opt/node24/bin явно.
NODE_BIN="${NODE_BIN:-/opt/node26/bin}"

if [ ! -x "$NODE_BIN/node" ]; then
  if [ -x /opt/node24/bin/node ]; then
    printf '⚠ в %s нет node — беру /opt/node24/bin\n' "$NODE_BIN" >&2
    NODE_BIN=/opt/node24/bin
  else
    printf '✗ не найден node в %s\n' "$NODE_BIN" >&2
    exit 1
  fi
fi
IMAGE="twentycrm/twenty"
HEALTH_URL="http://127.0.0.1:8093/healthz"
APP_URL="http://127.0.0.1:8093"
PREV_TAG_FILE="$SELF_DIR/.prev-tag"
MIN_FREE_PERCENT=10

DRY_RUN=0
REBUILD_SERVER=0
ARGS=()
for arg in "$@"; do
  case "$arg" in
    --dry-run|-n) DRY_RUN=1 ;;
    --server) REBUILD_SERVER=1 ;;
    *) ARGS+=("$arg") ;;
  esac
done
CMD="${ARGS[0]:-status}"
TAG="${ARGS[1]:-}"

log()  { printf '\033[1m== %s\033[0m\n' "$*"; }
ok()   { if [ "$DRY_RUN" = "1" ]; then printf '   \033[36m·\033[0m %s (план)\n' "$*"; else printf '   \033[32m✓\033[0m %s\n' "$*"; fi; }
warn() { printf '   \033[33m!\033[0m %s\n' "$*"; }
die()  { printf '\033[31mОШИБКА:\033[0m %s\n' "$*" >&2; exit 1; }

run() {
  if [ "$DRY_RUN" = "1" ]; then
    printf '   [dry-run] %s\n' "$*"
  else
    "$@"
  fi
}

current_tag() {
  grep -E '^TAG=' "$SELF_DIR/.env" 2>/dev/null | head -1 | cut -d= -f2
}

check_tag() {
  [ -n "${TAG:-}" ] || die "не указан тег: release.sh ${CMD} <tag>"
  [[ "$TAG" =~ ^[a-z0-9][a-z0-9._-]*$ ]] || die "недопустимый тег: $TAG"
  [ -z "$(current_tag)" ] || [ "$TAG" != "$(current_tag)" ] \
    || warn "тег $TAG уже указан в .env — это пересборка текущей версии"
}

free_percent() {
  df -P / | awk 'NR==2 {gsub("%","",$5); print 100-$5}'
}

preflight() {
  log "Проверка перед сборкой"
  local free
  free=$(free_percent)

  ok "свободно на диске: ${free}%"
  [ "$free" -ge "$MIN_FREE_PERCENT" ] || die "мало места (${free}%), нужно ≥ ${MIN_FREE_PERCENT}% — сначала чистка"
  [ -d "$CORE_DIR/packages/twenty-front" ] || die "нет исходников: $CORE_DIR"
  [ -d "$SELF_DIR" ] || die "нет каталога контейнера: $SELF_DIR"
  ok "исходники и конфигурация на месте"
}

build_image() {
  check_tag
  preflight

  log "Сборка фронта ($TAG)"
  if [ "$DRY_RUN" = "1" ]; then
    printf '   [dry-run] cd %s && PATH=%s:$PATH yarn nx build twenty-front --skip-nx-cache\n' "$CORE_DIR" "$NODE_BIN"
  else
    ( cd "$CORE_DIR" && PATH="$NODE_BIN:$PATH" yarn nx build twenty-front --skip-nx-cache )
  fi
  ok "фронт собран"

  log "Контекст сборки: build-context-${TAG#notify-}"
  local ctx="$FORK_DIR/build-context-${TAG#notify-}"
  # Готовый dist не затираем: с 2.58 образ собирается из полного серверного
  # dist, а не из одного модуля уведомлений. Пересобрать его можно флагом
  # --server, иначе берётся уже лежащий в контексте.
  if [ "$DRY_RUN" = "0" ]; then
    rm -rf "$ctx/front" "$ctx/server"
    mkdir -p "$ctx"
  else
    run mkdir -p "$ctx/front"
  fi
  if [ "$DRY_RUN" = "1" ]; then
    printf '   [dry-run] cp -r %s/packages/twenty-front/build/. %s/front/\n' "$CORE_DIR" "$ctx"
  else
    cp -r "$CORE_DIR/packages/twenty-front/build/." "$ctx/front/"
  fi
  ok "контекст готов"

  # Серверный код собирается из исходников по флагу --server (долго, 5–10 минут).
  if [ "$REBUILD_SERVER" = "1" ]; then
    log "Сборка сервера из исходников"
    if [ "$DRY_RUN" = "1" ]; then
      printf '   [dry-run] cd %s && PATH=%s:$PATH yarn nx build twenty-server --skip-nx-cache\n' "$CORE_DIR" "$NODE_BIN"
      printf '   [dry-run] cp -r %s/packages/twenty-server/dist %s/dist\n' "$CORE_DIR" "$ctx"
    else
      ( cd "$CORE_DIR" && PATH="$NODE_BIN:$PATH" yarn nx build twenty-server --skip-nx-cache )
      rm -rf "$ctx/dist"
      cp -r "$CORE_DIR/packages/twenty-server/dist" "$ctx/dist"
    fi
    ok "сервер собран, полный dist в контексте"
  fi

  local ctx_name="build-context-${TAG#notify-}"
  local dockerfile="$FORK_DIR/Dockerfile.$TAG"
  if [ ! -f "$dockerfile" ]; then
    log "Dockerfile.$TAG отсутствует — создаю от текущего образа"
    local base
    base=$(current_tag)
    [ -n "$base" ] || die "не знаю базовый образ: в .env нет TAG"
    if [ "$DRY_RUN" = "1" ]; then
      printf '   [dry-run] создать %s (FROM %s:%s)\n' "$dockerfile" "$IMAGE" "$base"
    else
      {
        echo "# Сборка $TAG: собрана автоматически поверх $base."
        echo "FROM $IMAGE:$base"
        echo
        echo "USER root"
        echo
        if [ -d "$ctx/dist" ]; then
          # 2.58+: сервер собран целиком, каталог dist заменяется полностью.
          echo "RUN rm -rf /app/packages/twenty-server/dist"
          echo "COPY $ctx_name/dist /app/packages/twenty-server/dist"
          echo "COPY $ctx_name/front /app/packages/twenty-server/dist/front"
          echo
          echo "RUN chown -R node:node /app/packages/twenty-server/dist"
        else
          # Старая схема: только фронт и один контроллер.
          echo "RUN rm -rf /app/packages/twenty-server/dist/front"
          echo "COPY $ctx_name/front /app/packages/twenty-server/dist/front"
          echo
          echo "RUN chown -R node:node /app/packages/twenty-server/dist/front"
        fi
        echo
        echo "USER node"
      } > "$dockerfile"
    fi
    ok "Dockerfile создан"
  else
    ok "использую готовый Dockerfile.$TAG"
  fi

  log "Сборка образа $IMAGE:$TAG"
  if [ "$DRY_RUN" = "1" ]; then
    printf '   [dry-run] docker build -f %s -t %s:%s %s\n' "$dockerfile" "$IMAGE" "$TAG" "$FORK_DIR"
  else
    docker build -f "$dockerfile" -t "$IMAGE:$TAG" "$FORK_DIR"
  fi
  ok "образ собран"
}

deploy_image() {
  check_tag

  log "Деплой $TAG"
  local prev
  prev=$(current_tag)

  if [ "$prev" = "$TAG" ] && [ "$DRY_RUN" = "0" ]; then
    warn "тег не менялся — контейнеры будут перезапущены на том же образе"
  fi

  if [ "$DRY_RUN" = "1" ]; then
    printf '   [dry-run] .env: TAG=%s -> %s\n' "$prev" "$TAG"
    printf '   [dry-run] cd %s && docker compose up -d server worker\n' "$SELF_DIR"
    return 0
  fi

  [ -f "$SELF_DIR/.env" ] || die "нет $SELF_DIR/.env"
  cp "$SELF_DIR/.env" "$SELF_DIR/.env.bak-$(date +%Y%m%d-%H%M%S)"
  [ -n "$prev" ] && echo "$prev" > "$PREV_TAG_FILE"

  sed -i "s|^TAG=.*|TAG=$TAG|" "$SELF_DIR/.env"
  ok "в .env записан TAG=$TAG (предыдущий: ${prev:-нет}, сохранён в .prev-tag)"

  ( cd "$SELF_DIR" && docker compose up -d server worker )
  ok "контейнеры подняты"
}

check_health() {
  log "Проверки после деплоя"
  local attempt code

  for attempt in $(seq 1 60); do
    code=$(curl -s -o /dev/null -w '%{http_code}' "$HEALTH_URL" || true)
    [ "$code" = "200" ] && break
    sleep 5
  done
  [ "$code" = "200" ] || die "healthz не ответил 200 (код: ${code:-нет ответа}) — смотри: docker logs twenty-server-1 --tail 100"
  ok "healthz = 200"

  local status
  status=$(docker inspect --format '{{.State.Health.Status}}' twenty-server-1 2>/dev/null || echo unknown)
  [ "$status" = "healthy" ] || warn "health контейнера: $status (проверь docker ps)"
  [ "$status" = "healthy" ] && ok "контейнер healthy"

  local image_tag
  image_tag=$(docker inspect --format '{{.Config.Image}}' twenty-server-1 2>/dev/null || true)
  ok "работает образ: $image_tag"

  # Маршруты уведомлений: без токена guard обязан отказать (401 или 403), а не 404.
  # 401/403 = контроллер на месте; 404 = маршрут потерян при сборке.
  local route
  for route in /api/notify/mine /api/notify/chat-list /api/notify/chat-unread; do
    code=$(curl -s -o /dev/null -w '%{http_code}' "$APP_URL$route" || true)
    if [ "$code" = "401" ] || [ "$code" = "403" ]; then
      ok "маршрут $route отвечает ($code)"
    elif [ "$code" = "404" ]; then
      die "маршрут $route потерян (404) — сервер собран без контроллера уведомлений"
    else
      warn "маршрут $route: код $code (ожидали 401/403)"
    fi
  done

  # Фронт отдаётся: index.html со ссылкой на бандл.
  # Сразу после старта сервер может отдать страницу без ассетов — повторяем.
  local html=""
  for attempt in $(seq 1 12); do
    html=$(curl -s "$APP_URL/" || true)
    echo "$html" | grep -q 'assets/index-' && break
    sleep 5
  done
  if echo "$html" | grep -q 'assets/index-'; then
    ok "фронт отдаёт бандл"
  else
    warn "в ответе / не найден assets/index-* — проверь фронт"
  fi
}

case "$CMD" in
  status)
    log "Состояние"
    printf '   TAG в .env:      %s\n' "$(current_tag)"
    printf '   предыдущий:      %s\n' "$(cat "$PREV_TAG_FILE" 2>/dev/null || echo нет)"
    printf '   свободно на /:   %s%%\n' "$(free_percent)"
    docker ps --filter 'name=twenty' --format '   {{.Names}}  {{.Image}}  {{.Status}}'
    ;;

  check)
    check_health
    ;;

  build)
    build_image
    ;;

  deploy)
    [ -n "$(docker images -q "$IMAGE:$TAG" 2>/dev/null)" ] || die "нет образа $IMAGE:$TAG — сначала сборка"
    deploy_image
    if [ "$DRY_RUN" = "1" ]; then log "Проверки: пропущены (dry-run)"; else check_health; fi
    ;;

  release)
    build_image
    deploy_image
    if [ "$DRY_RUN" = "1" ]; then log "Проверки: пропущены (dry-run)"; else check_health; fi
    ;;

  rollback)
    prev=$(cat "$PREV_TAG_FILE" 2>/dev/null || true)
    [ -n "$prev" ] || die "нет файла .prev-tag — откатываться некуда"
    [ -n "$(docker images -q "$IMAGE:$prev" 2>/dev/null)" ] || die "нет образа $IMAGE:$prev"
    TAG="$prev"
    deploy_image
    check_health
    ;;

  *)
    printf 'Неизвестная команда: %s\n\n' "$CMD" >&2
    sed -n '3,18p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
    exit 1
    ;;
esac
