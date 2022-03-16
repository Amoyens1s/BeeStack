import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'ini';
import { resolve } from 'path';
import { Module } from '@nestjs/common';

type DockerConfig =
  | {
      mode: 'local';
      local: {
        socketPath: string;
      };
    }
  | {
      mode: 'remote';
      remote: {
        protocol: 'https'; //目前只支持https
        host: string;
        port: string;
        ca: string;
        cert: string;
        key: string;
        socketPath: string;
      };
    };

@Injectable()
export class Config {
  private get config() {
    const config = parse(
      readFileSync(resolve(__dirname, 'config.ini'), 'utf-8'),
    );
    return config;
  }

  database = this.config.database;
  docker: DockerConfig = this.config.docker;
}

@Module({
  providers: [Config],
  exports: [Config],
})
export class ConfigModule {}
