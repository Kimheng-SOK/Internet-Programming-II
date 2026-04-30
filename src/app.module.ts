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
import { GraphqlModule } from './graphql/schema/graphql.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')], // schema-first (Part A)
      // autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),  // code-first (Part B)
      playground: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    ReceiptModule,
    OrdersModule,
    NotificationsModule,
    CoreModule,
    GraphqlModule,
  ],
})
export class AppModule {}
