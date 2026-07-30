# Twenty CRM — Форк Kplus79

Форк [Twenty CRM](https://github.com/twentyhq/twenty) с доработками для сервисного центра «Картридж+».

## Установка

```bash
# Скопировать конфиги
cp config/.env.example config/.env
# Отредактировать .env — указать SERVER_URL, ключи

# Запуск
cd docker
docker compose up -d
```

## Структура

```
twenty-fork/
├── docker/
│   ├── docker-compose.yml        # основной docker-compose (из upstream)
│   └── Dockerfile                # кастомный Dockerfile (на базе twentycrm/twenty)
├── patches/                      # патчи исходников Twenty
├── config/
│   └── .env.example              # образец конфигурации
└── README.md
```

## Обновление Twenty

```bash
cd /opt/twenty-crm/self-host
docker compose pull          # подтянуть новый образ
docker compose down && docker compose up -d
```

## Версия

Установлена: v2.24.1
Сервер: https://crm.kplus79.ru
