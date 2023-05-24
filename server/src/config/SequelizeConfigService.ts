import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { Todo } from '../modules/todos/models/Todo';
import { EnumConfig } from './enumConfig/enumConfig';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly _configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const { pg } = this._configService.get(EnumConfig.DATABASE);

    return {
      dialect: pg.dialect,
      logging: pg.logging,
      host: pg.host,
      port: pg.port,
      username: pg.username,
      password: pg.password,
      autoLoadModels: pg.autoLoadEntities,
      synchronize: pg.synchronize,
      models: [Todo],
    };
  }
}
