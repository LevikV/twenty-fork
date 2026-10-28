"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NotificationGateway", {
    enumerable: true,
    get: function() {
        return NotificationGateway;
    }
});
const _websockets = require("@nestjs/websockets");
const _socketio = require("socket.io");
const pg = require("pg");

// --- Присутствие по сокету (notify-v83) ---
// Виджет чата сообщает «я в этом чате», а когда карточку закрывают — соединение
// закрывается, и отметка снимается сразу. Без этого приходилось ждать, пока
// истечёт срок жизни отметки, и сообщения в эти секунды уходили в тишину.
let presencePool = null;
let presenceSchema = null;

function getPresencePool() {
    if (!process.env.PG_DATABASE_URL) {
        return null;
    }
    if (!presencePool) {
        presencePool = new pg.Pool({
            connectionString: process.env.PG_DATABASE_URL,
            max: 2
        });
    }
    return presencePool;
}

async function resolvePresenceSchema(pool) {
    if (presenceSchema) {
        return presenceSchema;
    }
    const result = await pool.query(
        "SELECT table_schema FROM information_schema.tables WHERE table_name = '_chatParticipant' LIMIT 1"
    );
    presenceSchema = result.rows.length > 0 ? result.rows[0].table_schema : null;
    return presenceSchema;
}

// Сокет знает идентификатор пользователя, а таблица участников хранит
// идентификатор сотрудника (workspaceMember). Кэшируем соответствие.
const memberCache = new Map();

async function resolveMemberId(pool, columnSchema, userId) {
    const cached = memberCache.get(userId);

    if (cached && Date.now() - cached.at < 600000) {
        return cached.id;
    }

    const result = await pool.query(
        `SELECT id FROM "${columnSchema}"."workspaceMember" WHERE "userId" = $1 AND "deletedAt" IS NULL LIMIT 1`,
        [userId]
    );
    const id = result.rows.length > 0 ? result.rows[0].id : null;

    if (id) {
        memberCache.set(userId, { id, at: Date.now() });
    }

    return id;
}

async function writePresence(userId, chatIds, present) {
    if (!userId || !chatIds || chatIds.length === 0) {
        return;
    }
    const pool = getPresencePool();
    if (!pool) {
        return;
    }
    const columnSchema = await resolvePresenceSchema(pool);
    if (!columnSchema) {
        return;
    }
    const memberId = await resolveMemberId(pool, columnSchema, userId);

    if (!memberId) {
        return;
    }

    const value = present ? "NOW()" : "NULL";
    await pool.query(
        `UPDATE "${columnSchema}"."_chatParticipant" SET "prisutstvie" = ${value}, "updatedAt" = NOW() WHERE "polzovatelId" = $1 AND "chatId" = ANY($2::uuid[]) AND "deletedAt" IS NULL`,
        [memberId, chatIds]
    );
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let NotificationGateway = class NotificationGateway {
    handleConnection(client) {
        const userId = client.handshake.query.userId;
        if (!userId) return;
        const existing = this.clients.get(userId) || [];
        this.clients.set(userId, [
            ...existing,
            client
        ]);
        this.claims.set(client.id, {
            userId,
            chats: new Set()
        });
        client.on("chat-presence", (payload)=>this.handlePresence(client.id, userId, payload));
    }
    handlePresence(socketId, userId, payload) {
        const chatId = payload && typeof payload.chatId === "string" ? payload.chatId : "";
        const claim = this.claims.get(socketId) || {
            userId,
            chats: new Set()
        };
        if (!chatId) {
            this.claims.set(socketId, claim);
            return;
        }
        claim.chats.add(chatId);
        this.claims.set(socketId, claim);
        writePresence(userId, [
            chatId
        ], true).catch(()=>{});
    }
    handleDisconnect(client) {
        this.clients.forEach((sockets, userId)=>{
            this.clients.set(userId, sockets.filter((s)=>s.id !== client.id));
        });
        const claim = this.claims.get(client.id);
        this.claims.delete(client.id);
        if (!claim || claim.chats.size === 0) {
            return;
        }
        // Если у того же человека открыт ещё один виджет с этим чатом,
        // отметку не снимаем — он всё ещё смотрит.
        const stillClaimed = new Set();
        this.claims.forEach((other)=>{
            if (other.userId === claim.userId) {
                other.chats.forEach((chatId)=>stillClaimed.add(chatId));
            }
        });
        const released = Array.from(claim.chats).filter((chatId)=>!stillClaimed.has(chatId));
        if (released.length === 0) {
            return;
        }
        writePresence(claim.userId, released, false).catch(()=>{});
    }
    sendToUser(userId, data) {
        const sockets = this.clients.get(userId) || [];
        sockets.forEach((s)=>s.emit('notify', data));
    }
    sendToAll(data) {
        this.server.emit('notify', data);
    }
    constructor(){
        this.clients = new Map();
        this.claims = new Map();
    }
};
_ts_decorate([
    (0, _websockets.WebSocketServer)(),
    _ts_metadata("design:type", typeof _socketio.Server === "undefined" ? Object : _socketio.Server)
], NotificationGateway.prototype, "server", void 0);
NotificationGateway = _ts_decorate([
    (0, _websockets.WebSocketGateway)({
        cors: true,
        path: '/ws'
    })
], NotificationGateway);

//# sourceMappingURL=notification.gateway.js.map