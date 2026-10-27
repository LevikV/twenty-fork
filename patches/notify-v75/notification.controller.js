"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NotificationController", {
    enumerable: true,
    get: function() {
        return NotificationController;
    }
});
const _common = require("@nestjs/common");
const _notificationgateway = require("./notification.gateway");
const _jwtauthguard = require("../../engine/guards/jwt-auth.guard");
const pg = require("pg");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}

// --- Центр уведомлений: запись истории (подэтап 2.3, notify-v46) ---
// Флаг NOTIFY_PERSIST=false отключает запись, пуши продолжают работать.
// Адресат может приходить как workspaceMember.id (из воркфлоу) или как user.id
// (его использует браузер для сокета). Определяем автоматически.
const TIP_VALUES = new Set(["ZVONOK", "ZADACHA", "SDELKA", "SOOBSHCHENIE", "SISTEMA"]);
const VARIANT_VALUES = new Set(["INFO", "SUCCESS", "WARNING", "ERROR"]);
const PRIORITET_VALUES = new Set(["OBYCHNOE", "VAZHNOE"]);

let notificationPool = null;
let cachedSchema = null;

function persistEnabled() {
    return process.env.NOTIFY_PERSIST !== "false";
}

function normalizeEnum(value, allowed) {
    if (typeof value !== "string") {
        return null;
    }
    const upper = value.trim().toUpperCase();
    return allowed.has(upper) ? upper : null;
}

function getPool() {
    if (!process.env.PG_DATABASE_URL) {
        return null;
    }
    if (!notificationPool) {
        notificationPool = new pg.Pool({
            connectionString: process.env.PG_DATABASE_URL,
            max: 2,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000
        });
        notificationPool.on("error", (error) => {
            console.error("[notify-persist] pool error:", error && error.message ? error.message : error);
        });
    }
    return notificationPool;
}

function parseLink(link) {
    const result = {
        objectName: null,
        recordId: null
    };
    if (typeof link !== "string" || !link) {
        return result;
    }
    // notify-v58: ссылка на страницу приложения (/page/<uuid>) — например, «Центр коммуникации».
    const pageMatch = link.match(/\/page\/([0-9a-fA-F-]{36})(?:[?#][^#]*?\bchatId=([0-9a-fA-F-]{36}))?/);
    if (pageMatch) {
        // notify-v59: в query может прийти chatId — кладём его рядом с id страницы
        // через «|», чтобы колокольчик мог собрать полный адрес.
        return {
            objectName: "page",
            recordId: pageMatch[2] ? pageMatch[1] + "|" + pageMatch[2] : pageMatch[1]
        };
    }
    const recordMatch = link.match(/\/objects?\/[^/]+\/([0-9a-fA-F-]{36})/);
    if (recordMatch) {
        result.recordId = recordMatch[1];
    }
    const objectMatch = link.match(/\/objects?\/([^/?#]+)/);
    if (objectMatch) {
        result.objectName = objectMatch[1];
    }
    return result;
}

async function resolveSchema(client) {
    if (cachedSchema) {
        return cachedSchema;
    }
    const workspace = await client.query('SELECT "databaseSchema" FROM core.workspace ORDER BY "createdAt" ASC LIMIT 1');
    const schema = workspace.rows.length ? workspace.rows[0].databaseSchema : null;
    if (schema && /^[a-z0-9_]+$/i.test(schema)) {
        cachedSchema = schema;
    }
    return cachedSchema;
}

// --- Центр уведомлений: чтение и отметка «прочитано» (notify-v50) ---
// Отдаём только записи текущего пользователя: memberId берём из проверенного
// access-токена (JwtAuthGuard), а не из запроса. Права роли на объект не нужны.
async function listForMember(client, schema, memberId, limit, offset) {
    const result = await client.query('SELECT id, tip, zagolovok, tekst, variant, prochitano, prioritet, "linkedObjectName", "linkedRecordId", "linkedRecordLabel", "createdAt", "dataProchteniya" FROM "' + schema + '"."_uvedomlenie" WHERE "poluchatelId" = $1 AND "deletedAt" IS NULL ORDER BY "createdAt" DESC LIMIT $2 OFFSET $3', [
        memberId,
        limit,
        offset
    ]);
    return result.rows;
}

async function countUnreadForMember(client, schema, memberId) {
    const result = await client.query('SELECT count(*)::int AS unread FROM "' + schema + '"."_uvedomlenie" WHERE "poluchatelId" = $1 AND "deletedAt" IS NULL AND (prochitano IS NULL OR prochitano = false)', [
        memberId
    ]);
    return result.rows.length ? result.rows[0].unread : 0;
}

async function markAllReadForMember(client, schema, memberId) {
    const result = await client.query('UPDATE "' + schema + '"."_uvedomlenie" SET prochitano = true, "dataProchteniya" = now(), "updatedAt" = now() WHERE "poluchatelId" = $1 AND "deletedAt" IS NULL AND (prochitano IS NULL OR prochitano = false) RETURNING id', [
        memberId
    ]);
    return result.rowCount;
}

async function markReadForMember(client, schema, id, memberId) {
    const result = await client.query('UPDATE "' + schema + '"."_uvedomlenie" SET prochitano = true, "dataProchteniya" = now(), "updatedAt" = now() WHERE id = $1 AND "poluchatelId" = $2 AND "deletedAt" IS NULL RETURNING id', [
        id,
        memberId
    ]);
    return result.rowCount > 0;
}

// На входе любой из двух id, на выходе оба: memberId (для записи) и userId (для сокета).
async function resolveTarget(client, schema, id) {
    const byMember = await client.query('SELECT id, "userId" FROM "' + schema + '"."workspaceMember" WHERE id = $1 AND "deletedAt" IS NULL', [
        id
    ]);
    if (byMember.rows.length) {
        const row = byMember.rows[0];
        return {
            memberId: row.id,
            userId: row.userId || row.id
        };
    }
    const byUser = await client.query('SELECT id, "userId" FROM "' + schema + '"."workspaceMember" WHERE "userId" = $1 AND "deletedAt" IS NULL', [
        id
    ]);
    if (byUser.rows.length) {
        const row = byUser.rows[0];
        return {
            memberId: row.id,
            userId: row.userId || id
        };
    }
    return {
        memberId: null,
        userId: id
    };
}

async function allMemberIds(client, schema) {
    const members = await client.query('SELECT id FROM "' + schema + '"."workspaceMember" WHERE "deletedAt" IS NULL');
    return members.rows.map((row) => row.id);
}

// Возвращает pushUserId (на кого слать сокет) и признак сохранения.
async function handleNotification(body) {
    const payload = body || {};
    const fallback = {
        pushUserId: payload.userId || null,
        persisted: false
    };
    const title = typeof payload.title === "string" ? payload.title.trim() : "";
    const pool = getPool();
    if (!pool || !title) {
        return fallback;
    }
    const client = await pool.connect();
    try {
        const schema = await resolveSchema(client);
        if (!schema) {
            return fallback;
        }
        let target = null;
        if (payload.userId) {
            target = await resolveTarget(client, schema, payload.userId);
        }
        if (!persistEnabled()) {
            return {
                pushUserId: target ? target.userId : fallback.pushUserId,
                persisted: false
            };
        }
        const recipients = payload.userId ? target && target.memberId ? [ target.memberId ] : [] : await allMemberIds(client, schema);
        if (!recipients.length) {
            return {
                pushUserId: target ? target.userId : fallback.pushUserId,
                persisted: false
            };
        }
        const tip = normalizeEnum(payload.tip, TIP_VALUES) || "SISTEMA";
        const variant = normalizeEnum(payload.variant, VARIANT_VALUES) || "INFO";
        const prioritet = normalizeEnum(payload.prioritet, PRIORITET_VALUES);
        const tekst = typeof payload.text === "string" ? payload.text : typeof payload.message === "string" ? payload.message : null;
        const link = parseLink(payload.link);
        const linkLabel = typeof payload.linkLabel === "string" ? payload.linkLabel : null;
        const insertSql = 'INSERT INTO "' + schema + '"."_uvedomlenie" ' + '(name, tip, zagolovok, tekst, variant, prochitano, prioritet, "linkedObjectName", "linkedRecordId", "linkedRecordLabel", "poluchatelId", position, "createdBySource", "createdByName") ' + "VALUES ($1, $2, $3, $4, $5, false, $6, $7, $8, $9, $10, 0, 'API', '/api/notify')";
        let notificationId = null;
        for (const recipientId of recipients) {
            const inserted = await client.query(insertSql + ' RETURNING id', [
                null,
                tip,
                title,
                tekst,
                variant,
                prioritet,
                link.objectName,
                link.recordId,
                linkLabel,
                recipientId
            ]);
            if (inserted.rows.length && inserted.rows[0].id) {
                notificationId = inserted.rows[0].id;
            }
        }
        return {
            pushUserId: target ? target.userId : fallback.pushUserId,
            persisted: true,
            notificationId
        };
    } finally {
        client.release();
    }
}

let NotificationController = class NotificationController {
    async notify(body) {
        const payload = body || {};
        let outcome = {
            pushUserId: payload.userId || null,
            persisted: false
        };
        if (payload.persist === false) {
            // Пуш без записи в «Уведомления»: так шлём сообщения чата —
            // они и так лежат в чате, дубль в колокольчике не нужен.
            outcome = {
                pushUserId: payload.userId || null,
                persisted: false
            };
        } else {
            try {
                outcome = await handleNotification(payload);
            } catch (error) {
                console.error("[notify-persist] failed:", error && error.message ? error.message : error);
            }
        }
        const wire = outcome.notificationId ? { ...payload, notificationId: outcome.notificationId } : payload;
        if (payload.userId) {
            this.gateway.sendToUser(outcome.pushUserId || payload.userId, wire);
        } else {
            this.gateway.sendToAll(wire);
        }
        return {
            sent: true,
            persisted: outcome.persisted
        };
    }
    async mine(request, query) {
        const memberId = request ? request.workspaceMemberId : null;
        const empty = {
            items: [],
            unreadCount: 0,
            hasMore: false
        };
        const pool = getPool();
        if (!pool || !memberId) {
            return empty;
        }
        const rawLimit = query && query.limit !== undefined ? parseInt(query.limit, 10) : 20;
        const rawOffset = query && query.offset !== undefined ? parseInt(query.offset, 10) : 0;
        const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 50) : 20;
        const offset = Number.isFinite(rawOffset) && rawOffset > 0 ? rawOffset : 0;
        let client = null;
        try {
            client = await pool.connect();
            const schema = await resolveSchema(client);
            if (!schema) {
                return empty;
            }
            const rows = await listForMember(client, schema, memberId, limit, offset);
            return {
                items: rows,
                unreadCount: await countUnreadForMember(client, schema, memberId),
                hasMore: rows.length === limit
            };
        } catch (error) {
            console.error("[notify-list] failed:", error && error.message ? error.message : error);
            return empty;
        } finally {
            if (client) {
                client.release();
            }
        }
    }
    async markAllRead(request) {
        const memberId = request ? request.workspaceMemberId : null;
        const pool = getPool();
        if (!pool || !memberId) {
            return {
                ok: false,
                updated: 0
            };
        }
        let client = null;
        try {
            client = await pool.connect();
            const schema = await resolveSchema(client);
            if (!schema) {
                return {
                    ok: false,
                    updated: 0
                };
            }
            return {
                ok: true,
                updated: await markAllReadForMember(client, schema, memberId)
            };
        } catch (error) {
            console.error("[notify-read-all] failed:", error && error.message ? error.message : error);
            return {
                ok: false,
                updated: 0
            };
        } finally {
            if (client) {
                client.release();
            }
        }
    }
    async markRead(body, request) {
        const memberId = request ? request.workspaceMemberId : null;
        const id = body && typeof body.id === "string" ? body.id : null;
        if (!memberId || !id) {
            return {
                ok: false
            };
        }
        const pool = getPool();
        if (!pool) {
            return {
                ok: false
            };
        }
        let client = null;
        try {
            client = await pool.connect();
            const schema = await resolveSchema(client);
            if (!schema) {
                return {
                    ok: false
                };
            }
            return {
                ok: await markReadForMember(client, schema, id, memberId)
            };
        } catch (error) {
            console.error("[notify-read] failed:", error && error.message ? error.message : error);
            return {
                ok: false
            };
        } finally {
            if (client) {
                client.release();
            }
        }
    }
    async chatUnread(request) {
        const memberId = request ? request.workspaceMemberId : null;
        const pool = getPool();
        console.log("[chat-unread] hit", "memberId=" + memberId, "pool=" + !!pool);
        if (!pool || !memberId) {
            return {
                count: 0
            };
        }
        let client = null;
        try {
            client = await pool.connect();
            const schema = await resolveSchema(client);
            if (!schema) {
                return {
                    count: 0
                };
            }
            const result = await client.query('SELECT COALESCE(SUM(p."neprochitano"), 0)::int AS count ' + 'FROM "' + schema + '"."_chatParticipant" p ' + 'JOIN "' + schema + '"."_chat" c ON c.id = p."chatId" ' + 'WHERE p."polzovatelId" = $1 AND p."deletedAt" IS NULL AND c."deletedAt" IS NULL', [
                memberId
            ]);
            const count = result.rows.length ? result.rows[0].count : 0;
            console.log("[chat-unread]", "memberId=" + memberId, "rows=" + result.rows.length, "count=" + count);
            return {
                count: typeof count === "number" ? count : 0
            };
        } catch (error) {
            console.error("[chat-unread] failed:", error && error.message ? error.message : error);
            return {
                count: 0
            };
        } finally {
            if (client) {
                client.release();
            }
        }
    }
    async chatList(request) {
        const memberId = request ? request.workspaceMemberId : null;
        const pool = getPool();
        console.log("[chat-list] hit", "memberId=" + memberId, "pool=" + !!pool);
        if (!pool || !memberId) {
            return {
                items: []
            };
        }
        let client = null;
        try {
            client = await pool.connect();
            const schema = await resolveSchema(client);
            if (!schema) {
                return {
                    items: []
                };
            }
            const result = await client.query('SELECT c.id, c.name, c."posledneeSoobshchenie" AS preview, c."vremyaPoslednego" AS at, p."neprochitano" AS unread ' + 'FROM "' + schema + '"."_chat" c ' + 'JOIN "' + schema + '"."_chatParticipant" p ON p."chatId" = c.id ' + 'WHERE p."polzovatelId" = $1 AND p."deletedAt" IS NULL AND c."deletedAt" IS NULL AND p."neprochitano" > 0 ' + 'ORDER BY c."vremyaPoslednego" DESC NULLS LAST LIMIT 10', [
                memberId
            ]);
            return {
                items: result.rows.map(function(row) {
                    return {
                        chatId: row.id,
                        name: row.name,
                        preview: row.preview,
                        at: row.at,
                        unread: row.unread
                    };
                })
            };
        } catch (error) {
            console.error("[chat-list] failed:", error && error.message ? error.message : error);
            return {
                items: []
            };
        } finally {
            if (client) {
                client.release();
            }
        }
    }
    constructor(gateway){
        this.gateway = gateway;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], NotificationController.prototype, "notify", null);
_ts_decorate([
    (0, _common.Get)('mine'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Query)()),
    _ts_metadata("design:paramtypes", [
        Object,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], NotificationController.prototype, "mine", null);
_ts_decorate([
    (0, _common.Post)('read-all'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], NotificationController.prototype, "markAllRead", null);
_ts_decorate([
    (0, _common.Post)('read'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Req)()),
    _ts_metadata("design:paramtypes", [
        Object,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], NotificationController.prototype, "markRead", null);
_ts_decorate([
    (0, _common.Get)("chat-list"),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], NotificationController.prototype, "chatList", null);
_ts_decorate([
    (0, _common.Get)('chat-unread'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], NotificationController.prototype, "chatUnread", null);
NotificationController = _ts_decorate([
    (0, _common.Controller)('api/notify'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _notificationgateway.NotificationGateway === "undefined" ? Object : _notificationgateway.NotificationGateway
    ])
], NotificationController);

//# sourceMappingURL=notification.controller.js.map
