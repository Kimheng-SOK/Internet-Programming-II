import { Inject, Injectable } from '@nestjs/common';
import { EVENT_PUBLISHER } from 'src/core/tokens';

type EventPublisher = (event: string, payload: any) => void;

@Injectable()
export class NotificationsService {
  constructor(
    // Method 1: Use forwardRef to avoid circular dependency lazy injection
    // @Inject(forwardRef(() => OrdersService))
    // private readonly ordersService: OrdersService,

    // Method 2: Use event publisher to decouple the services and avoid circular dependency
    @Inject(EVENT_PUBLISHER)
    private readonly publisher: EventPublisher,
  ) {}

  notify(event: string, payload: any) {
    this.publisher(event, payload);
    return { ok: true };
  }
}
