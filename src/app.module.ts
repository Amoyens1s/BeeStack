import { DockerModule } from './docker/docker.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/beestack', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'assets'),
    }),
    UserModule,
    AuthModule,
    DockerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
