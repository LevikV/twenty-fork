/*
 * Счётчик непрочитанных на кнопке «Центр коммуникации» в верхней панели.
 *
 * Кнопка добавлена патчем собранного фронта рядом с колокольчиком
 * (data-testid="chat-bell-button"). Этот скрипт:
 *   1) дергает GET /api/notify/chat-unread (наш маршрут в notification.controller.js);
 *   2) проставляет число в заранее отрендеренный span#crm-chat-bell-badge;
 *   3) если React пересоздал узел — создаёт span заново.
 */
(function () {
  var BADGE_ID = 'crm-chat-bell-badge';
  var POLL_MS = 30000;
  var count = 0;

  function fetchCount() {
    // no-store + метка времени: иначе браузер кеширует ответ по ETag и
    // после ревалидации (304) отдаёт пустое тело — счётчик пропадает.
    return fetch('/api/notify/chat-unread?_=' + Date.now(), {
      credentials: 'include',
      cache: 'no-store',
    })
      .then(function (response) {
        if (!response.ok) {
          showStatus('!' , 'HTTP ' + response.status);

          return null;
        }

        return response.json();
      })
      .then(function (payload) {
        if (!payload || typeof payload.count !== 'number') {
          return;
        }

        count = payload.count;
        render();
      })
      .catch(function (error) {
        showStatus('?', String(error && error.message ? error.message : error));
      });
  }

  function makeBadge() {
    var badge = document.createElement('span');

    badge.id = BADGE_ID;
    badge.style.cssText = [
      'display:none',
      'position:absolute',
      'top:-4px',
      'right:-4px',
      'align-items:center',
      'justify-content:center',
      'min-width:14px',
      'padding:2px 4px',
      'border-radius:999px',
      'background:#e5484d',
      'color:#ffffff',
      'font-size:10px',
      'font-weight:600',
      'line-height:1',
      'z-index:2',
    ].join(';');

    return badge;
  }

  /* Диагностика: если запрос не удался, показываем знак, чтобы это было видно. */
  function showStatus(mark, hint) {
    var badge = document.getElementById(BADGE_ID);

    if (!badge) {
      return;
    }

    badge.textContent = mark;
    badge.style.background = '#8b8b8b';
    badge.style.display = 'flex';
    badge.setAttribute('title', 'Чат: ' + hint);
  }

  function render() {
    var badge = document.getElementById(BADGE_ID);

    if (!badge) {
      return;
    }

    badge.style.background = '#e5484d';

    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : String(count);
      badge.style.display = 'flex';
      badge.setAttribute('title', 'Центр коммуникации — ' + count + ' непрочитанных');
    } else {
      badge.textContent = '';
      badge.style.display = 'none';
      badge.setAttribute('title', 'Центр коммуникации');
    }
  }

  var pending = null;

  function scheduleRender() {
    if (pending) {
      return;
    }

    pending = setTimeout(function () {
      pending = null;
      render();
    }, 250);
  }

  function start() {
    fetchCount();
    setInterval(fetchCount, POLL_MS);

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        fetchCount();
      }
    });

    window.addEventListener('crm-notify', function () {
      setTimeout(fetchCount, 800);
    });

    try {
      new MutationObserver(scheduleRender).observe(document.body, {
        childList: true,
        subtree: true,
      });
    } catch (error) {
      setInterval(render, 2000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
