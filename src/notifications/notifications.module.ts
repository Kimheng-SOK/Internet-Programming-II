import { NotificationsService } from './notifications.service';
import { CoreModule } from 'src/core/core.module';
import { forwardRef, Module } from '@nestjs/common';
// import { OrdersModule } from 'src/orders/orders.module';

@Module({
  // Method 1: Use forwardRef to avoid circular dependency lazy injection
  // imports: [forwardRef(() => OrdersModule)],

  // Method 2: Use event publisher to decouple the services and avoid circular dependency
  imports: [CoreModule],
  providers: [NotificationsService],
  // export it as the service will be used by other module
  exports: [NotificationsService],
})
export class NotificationsModule {}
