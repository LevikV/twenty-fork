import { Controller, Post, Body } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Controller('api/notify')
export class NotificationController {
  constructor(private gateway: NotificationGateway) {}

  @Post()
  notify(
    @Body()
    body: {
      userId?: string;
      title: string;
      variant?: 'info' | 'success' | 'warning' | 'error';
      duration?: number;
      link?: string;
      linkLabel?: string;
    },
  ) {
    if (body.userId) {
      this.gateway.sendToUser(body.userId, body);
    } else {
      this.gateway.sendToAll(body);
    }
    return { sent: true };
  }
}
