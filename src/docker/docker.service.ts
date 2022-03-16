import { Injectable } from '@nestjs/common';
import * as Dockerode from 'dockerode';
import { platform } from 'process';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Config } from 'src/config';

@Injectable()
export class DockerService {
  constructor(private config: Config) {}
  get dockerode(): Dockerode {
    if (this.config.docker.mode === 'remote') {
      return new Dockerode({
        protocol: this.config.docker.remote.protocol,
        host: this.config.docker.remote.host,
        port: +this.config.docker.remote.port,
        ca: readFileSync(resolve(__dirname, this.config.docker.remote.ca)),
        cert: readFileSync(resolve(__dirname, this.config.docker.remote.cert)),
        key: readFileSync(resolve(__dirname, this.config.docker.remote.key)),
        socketPath: this.config.docker.remote.socketPath,
      });
    }
    if (platform === 'win32') {
      return new Dockerode({
        socketPath: '//./pipe/docker_engine',
      });
    } else {
      return new Dockerode({
        socketPath: this.config.docker.local.socketPath,
      });
    }
  }
}
