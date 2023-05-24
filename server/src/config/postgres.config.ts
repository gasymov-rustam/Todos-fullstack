import { registerAs } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { EnumConfig } from './enumConfig/enumConfig';

export const pgConfig = registerAs(EnumConfig.DATABASE, () => ({
  dialect: <Dialect>process.env.SQL_DIALECT ?? 'postgres',
  logging: process.env.SQL_LOGGING === 'true',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: +process.env.DATABASE_PORT ?? 6000,
  username: process.env.DATABASE_USERNAME ?? 'postgres',
  password: process.env.DATABASE_PASSWORD ?? 'root',
  autoLoadEntities: true,
  synchronize: true,
}));
