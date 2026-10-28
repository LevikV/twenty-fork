import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface NotificationPayload {
  title: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  link?: string;
  linkLabel?: string;
}

@WebSocketGateway({ cors: true, path: '/ws' })
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private clients = new Map<string, Socket[]>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (!userId) return;
    const existing = this.clients.get(userId) || [];
    this.clients.set(userId, [...existing, client]);
  }

  handleDisconnect(client: Socket) {
    this.clients.forEach((sockets, userId) => {
      this.clients.set(
        userId,
        sockets.filter((s) => s.id !== client.id),
      );
    });
  }

  sendToUser(userId: string, data: NotificationPayload) {
    const sockets = this.clients.get(userId) || [];
    sockets.forEach((s) => s.emit('notify', data));
  }

  sendToAll(data: NotificationPayload) {
    this.server.emit('notify', data);
  }
}
