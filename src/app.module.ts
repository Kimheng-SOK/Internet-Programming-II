import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ReceiptModule } from './receipts/receipts.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from './core/core.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RootResolver } from './graphql/root.resolver';
import { DateTimeScalar } from './graphql/date-time.scalar';
import { GraphQLModule as AppGraphQLModule } from './graphql/schema/graphql.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ReceiptModule,
    OrdersModule,
    NotificationsModule,
    CoreModule,
    AppGraphQLModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [join(process.cwd(), 'src/graphql/**/*.graphql')],
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      resolvers: { DateTime: DateTimeScalar as any },
      playground: true,
    }),
  ],
  providers: [RootResolver],
})
export class AppModule {}
