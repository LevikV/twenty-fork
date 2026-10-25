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
        for (const recipientId of recipients) {
            await client.query(insertSql, [
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
        }
        return {
            pushUserId: target ? target.userId : fallback.pushUserId,
            persisted: true
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
        try {
            outcome = await handleNotification(payload);
        } catch (error) {
            console.error("[notify-persist] failed:", error && error.message ? error.message : error);
        }
        if (payload.userId) {
            this.gateway.sendToUser(outcome.pushUserId || payload.userId, payload);
        } else {
            this.gateway.sendToAll(payload);
        }
        return {
            sent: true,
            persisted: outcome.persisted
        };
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
NotificationController = _ts_decorate([
    (0, _common.Controller)('api/notify'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _notificationgateway.NotificationGateway === "undefined" ? Object : _notificationgateway.NotificationGateway
    ])
], NotificationController);

//# sourceMappingURL=notification.controller.js.map
