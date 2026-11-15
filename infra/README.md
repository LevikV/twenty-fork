# Инфраструктура контура CRM

Конфигурация сервера, которая раньше жила только на машине и восстанавливалась
по памяти. Здесь её копии — чтобы после переустановки сервера ничего не собирать заново.

## Что где

| Что | Здесь | Куда на сервере |
|---|---|---|
| Nginx сайта CRM | `nginx/crm.kplus79.ru` | `/etc/nginx/sites-available/crm.kplus79.ru` |
| Имя файла при скачивании | `nginx/crm-file-names.conf` | `/etc/nginx/conf.d/` |
| Ограничение частоты SMS-шлюза | `nginx/sms-gateway-limits.conf` | `/etc/nginx/conf.d/` |
| Лог вебхуков SMS | `nginx/sms-hook-log.conf` | `/etc/nginx/conf.d/` |
| Боевой compose | `self-host/docker-compose.yml` | `/opt/twenty-crm/self-host/` |
| Шаблон переменных | `self-host/.env.example` | `/opt/twenty-crm/self-host/.env` |

## Как накатывать

Конфиги nginx копируются вручную и проверяются **до** перезагрузки:

```bash
cp infra/nginx/crm.kplus79.ru            /etc/nginx/sites-available/crm.kplus79.ru
cp infra/nginx/*.conf                    /etc/nginx/conf.d/
nginx -t && systemctl reload nginx
```

`compose` и `.env` — только копирование, затем:

```bash
cd /opt/twenty-crm/self-host && docker compose up -d
```

## Что важно помнить

- `nginx/crm.kplus79.ru` содержит блоки `location = /integrations/sms-hook` и
  `/integrations/chat/` — маршруты живут в одном домене, без поддоменов.
- Секретов в репозитории нет: значения только в `/opt/twenty-crm/self-host/.env`
  и `/opt/sms-gateway/.env` (см. `kplus-scripts/crm-builder/sms-gateway`).
- Сертификаты Let's Encrypt выпускаются на сервере (`certbot`), в репозиторий не кладутся.
