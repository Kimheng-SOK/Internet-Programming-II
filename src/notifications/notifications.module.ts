import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Module({
  providers: [NotificationsService],
  // export it as the service will be used by other module
  exports: [NotificationsService],
})
export class NotificationsModule {}
