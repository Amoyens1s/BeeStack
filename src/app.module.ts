import { DockerModule } from './docker/docker.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CPUModule } from './cpu/cpu.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://121.5.111.250:27017/admin', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      user: 'admin',
      pass: '123456',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'assets'),
    }),
    UserModule,
    AuthModule,
    DockerModule,
    CPUModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
