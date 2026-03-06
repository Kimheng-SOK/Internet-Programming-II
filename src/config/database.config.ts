import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Receipt } from 'src/database/entities/receipts.entity';

dotenv.config();

// console.log(process.env);

export const databaseConfig: TypeOrmModule = {
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT, 10)
    : 5432,
  host: process.env.POSTGRES_HOST,
  entities: [Receipt],
  synchronize: true, // Set to false in production
};
