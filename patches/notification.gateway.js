"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let NotificationGateway = class NotificationGateway {
    server;
    clients = new Map();
    handleConnection(client) {
        const userId = client.handshake.query.userId;
        if (!userId)
            return;
        const existing = this.clients.get(userId) || [];
        this.clients.set(userId, [...existing, client]);
    }
    handleDisconnect(client) {
        this.clients.forEach((sockets, userId) => {
            this.clients.set(userId, sockets.filter((s) => s.id !== client.id));
        });
    }
    sendToUser(userId, data) {
        const sockets = this.clients.get(userId) || [];
        sockets.forEach((s) => s.emit('notify', data));
    }
    sendToAll(data) {
        this.server.emit('notify', data);
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true, path: '/ws' })
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map