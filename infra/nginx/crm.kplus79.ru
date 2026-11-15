server {
    server_name crm.kplus79.ru;
    client_max_body_size 100M;

    # SMS-шлюз (SMSGate private server). Один домен, без поддомена: канал живёт путём.
    # Префикс /integrations/sms/ отрезается, сервер видит свои /api/... маршруты.
    location = /integrations/sms { return 301 /integrations/sms/; }

    location /integrations/sms/ {
        limit_req zone=smsapi burst=40 nodelay;

        # Метрики Prometheus наружу не отдаём
        location = /integrations/sms/metrics { return 404; }

        proxy_pass http://127.0.0.1:3001/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Connection "";

        # SSE-подключения устройств держатся открытыми
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }

    # ВРЕМЕННО, этап 1: приёмник вебхуков приложения (событие sms:received).
    # Служит только для проверки приёма; на этапе 3 заменяется маршрутом приложения chat-rooms.
    location = /integrations/sms-hook {
        access_log /var/log/nginx/sms-hook.log sms_hook;
        proxy_pass http://127.0.0.1:3002;
        proxy_set_header Host $host;
    }

    # Отдача файлов: имя при сохранении берётся из параметра filename
    # (см. /etc/nginx/conf.d/crm-file-names.conf). Без параметра — как раньше.
    location /integrations/chat/ {
        client_max_body_size 2048m;
        proxy_request_buffering off;
        proxy_read_timeout 1800s;
        proxy_send_timeout 1800s;
        proxy_http_version 1.1;
        proxy_pass http://127.0.0.1:8099/;
    }

    location /file/ {
        proxy_pass http://127.0.0.1:8093;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_hide_header Content-Disposition;
        add_header Content-Disposition $crm_file_cd always;
    }

    location / {
        proxy_pass http://127.0.0.1:8093;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/crm.kplus79.ru/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/crm.kplus79.ru/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = crm.kplus79.ru) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name crm.kplus79.ru;
    return 404; # managed by Certbot


}
