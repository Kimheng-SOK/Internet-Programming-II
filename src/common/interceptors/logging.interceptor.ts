import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = this.getRequest(context);
    if (req) {
      console.log(`Incoming request: ${req.method} ${req.url}`);
    } else {
      console.log('Incoming request: [GraphQL]');
    }
    const { method, url } = req ?? { method: 'GQL', url: '' };
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - start;
        console.log(`Handled [HTTP] ${method} ${url} in ${ms}ms`);
      }),
    );
  }

  private getRequest(context: ExecutionContext) {
    if (context.getType<'http' | 'graphql'>() === 'http') {
      return context.switchToHttp().getRequest();
    }

    const gqlContext = GqlExecutionContext.create(context).getContext();
    return gqlContext?.req;
  }
}
