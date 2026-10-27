/*
 * Счётчик непрочитанных сообщений у пункта «Центр коммуникации» в левом меню.
 *
 * Ядро Twenty не умеет показывать бейдж у пункта меню, поэтому:
 *   1) серверный маршрут GET /api/notify/chat-unread (патч notification.controller.js)
 *      отдаёт сумму непрочитанных по чатам текущего пользователя;
 *   2) этот скрипт находит пункт меню по подписи и дорисовывает рядом цифру.
 *
 * Скрипт самовосстанавливается: iframe не нужен, MutationObserver возвращает
 * бейдж после перерисовок React.
 */
(function () {
  var LABEL = 'Центр коммуникации';
  var BADGE_CLASS = 'crm-nav-unread-badge';
  var POLL_MS = 30000;
  var count = 0;

  function readToken() {
    try {
      var raw = localStorage.getItem('tokenPairState');

      if (!raw) {
        return null;
      }

      var parsed = JSON.parse(raw);

      function dig(value, depth) {
        if (!value || typeof value !== 'object' || depth > 8) {
          return null;
        }

        if (typeof value.token === 'string' && value.token.length > 20) {
          return value.token;
        }

        for (var key in value) {
          if (!Object.prototype.hasOwnProperty.call(value, key)) {
            continue;
          }

          var found = dig(value[key], depth + 1);

          if (found) {
            return found;
          }
        }

        return null;
      }

      return dig(parsed, 0);
    } catch (error) {
      return null;
    }
  }

  function fetchCount() {
    var token = readToken();
    var headers = token ? { Authorization: 'Bearer ' + token } : {};

    return fetch('/api/notify/chat-unread', {
      credentials: 'include',
      headers: headers,
    })
      .then(function (response) {
        if (!response.ok) {
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
      .catch(function () {
        /* тихо: счётчик — украшение, страницу не ломаем */
      });
  }

  function findLabels() {
    var result = [];
    var nodes = document.querySelectorAll('a, button, span, div, p');

    for (var index = 0; index < nodes.length; index += 1) {
      var node = nodes[index];

      if (node.children.length > 0) {
        continue;
      }

      if ((node.textContent || '').trim() === LABEL) {
        result.push(node);
      }
    }

    return result;
  }

  function removeBadges() {
    var stale = document.querySelectorAll('.' + BADGE_CLASS);

    for (var index = 0; index < stale.length; index += 1) {
      stale[index].parentNode && stale[index].parentNode.removeChild(stale[index]);
    }
  }

  function render() {
    var labels = findLabels();

    if (labels.length === 0) {
      return;
    }

    removeBadges();

    if (count <= 0) {
      return;
    }

    for (var index = 0; index < labels.length; index += 1) {
      var label = labels[index];
      var host = label.closest('a, button') || label.parentElement;

      if (!host) {
        continue;
      }

      var badge = document.createElement('span');

      badge.className = BADGE_CLASS;
      badge.textContent = count > 99 ? '99+' : String(count);
      badge.style.cssText = [
        'display:inline-flex',
        'align-items:center',
        'justify-content:center',
        'min-width:18px',
        'height:18px',
        'padding:0 5px',
        'margin-left:6px',
        'border-radius:9px',
        'background:#e5484d',
        'color:#ffffff',
        'font-size:11px',
        'font-weight:600',
        'line-height:18px',
        'flex:none',
      ].join(';');

      host.appendChild(badge);
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
