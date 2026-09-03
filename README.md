# Twenty CRM — Форк Kplus79

Форк [Twenty CRM](https://github.com/twentyhq/twenty) с доработками для сервисного центра «Картридж+»:
**push-уведомления** (WebSocket + звук) и фиксы фронтенда.

Исходники доработок (ветки `feature/push-notifications-*`) — в репозитории [LevikV/twenty](https://github.com/LevikV/twenty).
Здесь — Docker-конфиги и процедура сборки кастомных образов.

## Сборка образа с патчами (notify-vNN)

Процесс отработан на `v2.37.4` (notify-v41, 2026-09-03). Полная пошаговая история — в Obsidian:
`10-projects/CRM/Доработки/Пуш уведомления/plan.md`.

Кратко:

```bash
# 1. Ветка от нужного тега upstream + перенос патчей (в worktree, чтобы не трогать рабочую копию)
cd /opt/twenty-crm/repos/twenty-source
git worktree add -b feature/push-notifications-v37 /opt/twenty-crm/repos/twenty-v37 twenty/v2.37.4
cd /opt/twenty-crm/repos/twenty-v37
git cherry-pick <коммиты патчей>
# Конфликт package.json: новые версии nest (HEAD) + наши зависимости
# yarn.lock: git checkout <тег> -- yarn.lock && yarn install

# 2. Сборка фронта и сервера на хосте
yarn nx build twenty-server
yarn nx build twenty-front --skip-nx-cache
# ENOSPC file watchers при 2+ деревьях: sysctl -w fs.inotify.max_user_watches=1048576

# 3. Build-context (не коммитится, генерируется)
mkdir -p build-context-v41/{front,patches,deps}
cp -r packages/twenty-front/build/. build-context-v41/front/          # собранный фронт
cp packages/twenty-server/dist/modules/notification/*.js \
   packages/twenty-server/dist/modules/modules.module.js build-context-v41/patches/
# deps: node_modules-пакеты (websockets, socket.io, engine.io, ws, cors...) — cp с сохранением структуры @nestjs/

# 4. Docker build
docker build -f Dockerfile.notify-v41 -t twentycrm/twenty:notify-v41 build-context-v41/

# 5. Деплой
# в /opt/twenty-crm/self-host/.env: TAG=notify-v41
docker compose up -d server worker   # миграции БД пройдут при старте server
```

⚠️ **Частые грабли апгрейда:** если `Upgrade failed` на workspace-командах — проверь корзину
(`deletedAt IS NOT NULL`) в `core."viewField"` / `core."view"`: soft-deleted строки держат
бизнес-уникальность и блокируют backfill. Лечение: `DELETE FROM core."viewField" WHERE ... AND "deletedAt" IS NOT NULL`
(эквивалент «See deleted records → Destroy») → `docker compose restart server`.

## Структура

```
twenty-fork/
├── docker/
│   └── docker-compose.yml        # compose-конфиг (зеркало /opt/twenty-crm/self-host)
├── config/
│   └── .env.example              # образец конфигурации
├── Dockerfile.notify-v7          # ранние сборки (v2.24.1, история)
├── Dockerfile.notify-v32         # сборка на базе v2.32.0 (история)
├── Dockerfile.notify-v41         # актуальная сборка на базе v2.37.4
├── build-context-v41/            # генерируется при сборке (в .gitignore)
└── README.md
```

## Версия

Установлена: **v2.37.4** (notify-v41, сборка 2026-09-03)
Сервер: https://crm.kplus79.ru
