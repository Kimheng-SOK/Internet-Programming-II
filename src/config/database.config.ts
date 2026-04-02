import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/database/entities/orders.entity';
import { Receipt } from 'src/database/entities/receipts.entity';

export const databaseConfig: TypeOrmModule = {
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT, 10)
    : 5432,
  host: process.env.POSTGRES_HOST,
  entities: [Receipt, Order],
  synchronize: true, // Set to false in production
};
