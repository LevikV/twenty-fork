# Twenty CRM — Форк Kplus79

Форк [Twenty CRM](https://github.com/twentyhq/twenty) с доработками для сервисного центра «Картридж+»:
**push-уведомления** (WebSocket + звук), фиксы фронтенда, правила записи.
Исходники ядра (ветка `feature/push-notifications-v37`) — в репозитории
[LevikV/twenty](https://github.com/LevikV/twenty).

Здесь — Docker-конфиги, серверные патчи и процедура сборки образов.

## Где что лежит

| Что | Где |
|---|---|
| Исходники ядра (TS, фронт и сервер) | `LevikV/twenty`, ветка `feature/push-notifications-v37` |
| Серверный код, который копируется в образ | `twenty-v37/packages/twenty-server/src/modules/notification/` (собирается при выпуске) |
| Исторические патчи (до v93) | `patches/<версия>/` — в git, нужны только для пересборки старых образов |
| Рецепт сборки текущей версии | `Dockerfile.notify-v93` |
| Рецепт предыдущей версии (откат) | `Dockerfile.notify-v92` |
| База цепочки сборок | `Dockerfile.notify-v44` (от `twentycrm/twenty:v2.37.4`) |
| Собранные артефакты сборки | `build-context-vNN/` — **не в git**, генерируются |

## Правило: серверный код — только из исходников

До `notify-v92` серверный код уведомлений жил отдельным `.js`-файлом в `patches/` и
копировался поверх собранного сервера — так накопилось 8 маршрутов, которых не было
в исходниках. С `notify-v93` это исправлено:

- правится **TS-исходник** в `twenty-v37` (`notification.controller.ts` и соседние);
- при выпуске он компилируется (`release.sh ... --server`) и в образ попадает
  скомпилированный файл, а не ручной патч;
- `patches/` остаётся музейным: там код, применявшийся в v79–v92, — нужен, чтобы
  старые Dockerfile'ы оставались воспроизводимыми.

Игнорируются только `build-context*/`, `deps/` и `*.tar` — это артефакты.

## Сборка образа (notify-vNN)

Полная пошаговая история — в Obsidian: `10-projects/CRM/Доработки/Пуш уведомления/plan.md`.

Обычный выпуск — одной командой:

```bash
cd /opt/twenty-crm/repos/twenty-fork
./scripts/release.sh status                 # что сейчас работает
./scripts/release.sh release notify-v93                 # фронт + образ + деплой
./scripts/release.sh release notify-v94 --server        # ещё и серверный код из TS
./scripts/release.sh release notify-v93 -n              # только показать план
./scripts/release.sh rollback               # вернуться на предыдущий образ
```

`--server` добавляет сборку `twenty-server` (5–10 минут) и подмену модуля уведомлений
собранным из исходников. Без него серверный код берётся из базового образа.

Что делает `release`:

1. проверяет свободное место (нужно ≥ 10 %), наличие исходников и `.env`;
2. собирает фронт в `twenty-v37` (`yarn nx build twenty-front`);
3. собирает `build-context-vNN/front` и, если нет — `Dockerfile.notify-vNN`
   поверх текущего образа;
4. `docker build` нового образа;
5. пишет `TAG` в `/opt/twenty-crm/self-host/.env` (предыдущий тег — в `.prev-tag`),
   поднимает `server` и `worker`;
6. проверяет `healthz`, health контейнера, маршруты `/api/notify/*`
   (401/403 = контроллер на месте, 404 = потерян) и отдачу бандла.

<details>
<summary>Ручная сборка (если скрипт недоступен)</summary>

```bash
# 1. Исходники: ветка от нужного тега upstream + перенос патчей
cd /opt/twenty-crm/repos/twenty-v37
git checkout feature/push-notifications-v37
git pull

# 2. Сборка фронта и сервера на хосте
yarn nx build twenty-server
yarn nx build twenty-front --skip-nx-cache
# ENOSPC file watchers: sysctl -w fs.inotify.max_user_watches=1048576

# 3. Build-context (не коммитится)
mkdir -p build-context-v93/front
cp -r packages/twenty-front/build/. build-context-v93/front/

# 4. Образ: новый Dockerfile = FROM предыдущего + COPY контекста и патчей
docker build -f Dockerfile.notify-v93 -t twentycrm/twenty:notify-v93 .

# 5. Деплой
# в /opt/twenty-crm/self-host/.env: TAG=notify-v93
docker compose up -d server worker   # миграции БД пройдут при старте server
```

</details>


## Откат

```bash
# в /opt/twenty-crm/self-host/.env: TAG=notify-v93
docker compose up -d server worker
```

Образы `notify-v82 … notify-v93` хранятся локально на сервере — откат не требует пересборки.

## История сборок

Удалённые `Dockerfile.notify-vNN` (v7 … v89) остаются в истории git:

```bash
git log --oneline -- Dockerfile.notify-v85     # найти коммит
git show <коммит>:Dockerfile.notify-v85        # посмотреть содержимое
```

Контексты удалённых версий не хранятся: собранный фронт уже внутри соответствующего образа.

⚠️ **Частые грабли апгрейда:** если `Upgrade failed` на workspace-командах — проверь корзину
(`deletedAt IS NOT NULL`) в `core."viewField"` / `core."view"`: soft-deleted строки держат
бизнес-уникальность и блокируют backfill. Лечение: `DELETE FROM core."viewField" WHERE ... AND "deletedAt" IS NOT NULL`
(эквивалент «See deleted records → Destroy») → `docker compose restart server`.

## Структура

```
twenty-fork/
├── infra/
│   ├── nginx/                    # конфиги nginx: сайт CRM, имя файла, лимиты SMS
│   ├── self-host/                # боевой docker-compose + шаблон .env
│   └── README.md                 # что куда копируется и как
├── scripts/
│   └── release.sh                # сборка, деплой, проверки, откат
├── patches/
│   ├── notify-v79/               # серверный код, применённый в v79+
│   └── notify-v68/…              # предыдущие версии (история)
├── Dockerfile.notify-v44         # база цепочки (v2.37.4)
├── Dockerfile.notify-v92         # предыдущая версия (откат)
├── Dockerfile.notify-v93         # текущая
├── build-context-v92/            # генерируется (в .gitignore)
├── build-context-v93/            # генерируется (в .gitignore)
└── README.md
```

## Версия

Установлена: **v2.37.4**, образ **notify-v93** (серверный код уведомлений — из TS-исходников).
Сервер: https://crm.kplus79.ru
