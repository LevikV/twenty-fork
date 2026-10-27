/*
 * «Центр коммуникации» в шапке Twenty.
 *
 * Кнопка и бейдж отрендерены патчем бандла (рядом с колокольчиком).
 * Этот скрипт:
 *   1) проставляет число непрочитанных в span#crm-chat-bell-badge;
 *   2) по клику на кнопку открывает всплывашку со списком непрочитанных
 *      диалогов и ссылкой «Все диалоги»;
 *   3) если страницу открыли как /page/<id>?chatId=<chatId>, передаёт этот
 *      chatId встроенному компоненту через postMessage (сам компонент адрес
 *      страницы не видит — он живёт в песочнице).
 */
(function () {
  var BADGE_ID = 'crm-chat-bell-badge';
  var PANEL_ID = 'crm-chat-popover';
  var PAGE_ID = '30e9b2da-683c-4fce-8a61-5c5102d69f3e';
  var POLL_MS = 5000;
  var count = 0;

  /* ───────────────────────── счётчик ───────────────────────── */

  function fetchCount() {
    // no-store + метка времени: иначе браузер кеширует ответ по ETag и
    // после ревалидации (304) отдаёт пустое тело — счётчик пропадает.
    return fetch('/api/notify/chat-unread?_=' + Date.now(), {
      credentials: 'include',
      cache: 'no-store',
    })
      .then(function (response) {
        if (!response.ok) {
          showStatus('!', 'HTTP ' + response.status);

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

  /* ─────────────────────── всплывашка ──────────────────────── */

  function panelAnchor() {
    var badge = document.getElementById(BADGE_ID);

    if (badge && badge.parentNode) {
      return badge.parentNode;
    }

    return null;
  }

  function closePanel() {
    var panel = document.getElementById(PANEL_ID);

    if (panel && panel.parentNode) {
      panel.parentNode.removeChild(panel);
    }

    document.removeEventListener('mousedown', onDocumentMouseDown, true);
  }

  function onDocumentMouseDown(event) {
    var panel = document.getElementById(PANEL_ID);

    if (!panel) {
      return;
    }

    if (panel.contains(event.target)) {
      return;
    }

    var anchor = panelAnchor();

    if (anchor && anchor.contains(event.target)) {
      return;
    }

    closePanel();
  }

  function el(tag, styles, text) {
    var node = document.createElement(tag);

    if (styles) {
      node.style.cssText = styles;
    }

    if (text !== undefined) {
      node.textContent = text;
    }

    return node;
  }

  function openChat(chatId) {
    window.location.href = '/page/' + PAGE_ID + '?chatId=' + encodeURIComponent(chatId);
  }

  function renderPanel(items) {
    var panel = el('div', [
      'position:fixed',
      'z-index:2147483000',
      'width:340px',
      'max-height:420px',
      'overflow:auto',
      'background:#ffffff',
      'color:#111111',
      'border:1px solid #e0e0e0',
      'border-radius:8px',
      'box-shadow:0 8px 24px rgba(0,0,0,0.18)',
      'font-family:inherit',
      'padding:8px 0',
    ].join(';'));

    panel.id = PANEL_ID;

    var header = el('div', 'display:flex;justify-content:space-between;align-items:center;padding:4px 12px 8px;border-bottom:1px solid #eeeeee;', 'Сообщения');

    header.style.fontWeight = '600';
    panel.appendChild(header);

    if (!items || items.length === 0) {
      panel.appendChild(el('div', 'padding:14px 12px;color:#777777;font-size:13px;', 'Нет непрочитанных сообщений'));
    } else {
      items.forEach(function (item) {
        var row = el('div', 'padding:8px 12px;cursor:pointer;border-bottom:1px solid #f4f4f4;');

        row.addEventListener('mouseenter', function () {
          row.style.background = '#f7f7f7';
        });
        row.addEventListener('mouseleave', function () {
          row.style.background = 'transparent';
        });
        row.addEventListener('click', function () {
          closePanel();

          // Чат сделки/ремонта/… — открываем карточку записи в боковой панели,
          // личный чат — страницу диалогов с нужным чатом.
          if (item.objectName && item.recordId) {
            window.dispatchEvent(
              new CustomEvent('crm-open-record', {
                detail: { objectName: item.objectName, recordId: item.recordId },
              }),
            );

            return;
          }

          openChat(item.chatId);
        });

        var titleRow = el('div', 'display:flex;justify-content:space-between;align-items:center;gap:8px;');
        var name = el('div', 'font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;', String(item.name || 'Диалог'));
        var badge = el('div', 'min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:#e5484d;color:#fff;font-size:10px;font-weight:600;display:flex;align-items:center;justify-content:center;', String(item.unread || ''));

        titleRow.appendChild(name);
        titleRow.appendChild(badge);
        row.appendChild(titleRow);
        row.appendChild(el('div', 'font-size:12px;color:#666666;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;', String(item.preview || '')));
        panel.appendChild(row);
      });
    }

    var footer = el('div', 'padding:10px 12px 4px;border-top:1px solid #eeeeee;');
    var link = el('a', 'color:#206bc4;font-size:13px;text-decoration:none;cursor:pointer;', 'Все диалоги');

    link.addEventListener('click', function (event) {
      event.preventDefault();
      closePanel();
      window.location.href = '/page/' + PAGE_ID;
    });
    footer.appendChild(link);
    panel.appendChild(footer);

    var anchor = panelAnchor();

    if (!anchor) {
      return;
    }

    document.body.appendChild(panel);

    var rect = anchor.getBoundingClientRect();

    panel.style.top = Math.round(rect.bottom + 8) + 'px';
    panel.style.left = Math.max(8, Math.round(rect.right - 340)) + 'px';

    document.addEventListener('mousedown', onDocumentMouseDown, true);
  }

  function togglePanel() {
    if (document.getElementById(PANEL_ID)) {
      closePanel();

      return;
    }

    fetch('/api/notify/chat-list?_=' + Date.now(), {
      credentials: 'include',
      cache: 'no-store',
    })
      .then(function (response) {
        if (!response.ok) {
          return { items: [] };
        }

        return response.json();
      })
      .then(function (payload) {
        renderPanel((payload && payload.items) || []);
      })
      .catch(function () {
        renderPanel([]);
      });
  }

  /* ─────────── передача chatId встроенному компоненту ───────── */

  function chatIdFromUrl() {
    try {
      return new URLSearchParams(window.location.search).get('chatId');
    } catch (error) {
      return null;
    }
  }

  function sendChatIdToFrames(chatId) {
    if (!chatId) {
      return;
    }

    var frames = document.querySelectorAll('iframe');

    for (var index = 0; index < frames.length; index += 1) {
      try {
        frames[index].contentWindow.postMessage(
          { type: 'crm-open-chat', chatId: chatId },
          '*',
        );
      } catch (error) {
        /* кадр ещё не готов — повторим по таймеру */
      }
    }
  }

  function watchChatIdInUrl() {
    var chatId = chatIdFromUrl();

    if (!chatId) {
      return;
    }

    // Компонент монтируется позже — повторяем несколько раз.
    var attempts = 0;
    var timer = setInterval(function () {
      attempts += 1;
      sendChatIdToFrames(chatId);

      if (attempts > 20) {
        clearInterval(timer);
      }
    }, 500);
  }

  /* ─────────────────────────── старт ───────────────────────── */

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

    window.addEventListener('focus', function () {
      fetchCount();
    });

    window.addEventListener('crm-notify', function () {
      fetchCount();
    });

    window.addEventListener('crm-notify', function () {
      setTimeout(fetchCount, 800);
    });

    window.addEventListener('crm-chat-popover', function () {
      togglePanel();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closePanel();
      }
    });

    watchChatIdInUrl();

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
