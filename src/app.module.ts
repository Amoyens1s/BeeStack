import { DockerModule } from './docker/docker.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CPUModule } from './cpu/cpu.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MemoryModule } from './memory/memory.module';
console.log(__dirname);

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://121.5.111.250:27017/admin', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      user: 'admin',
      pass: '123456',
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      playground: true,
    }),
    // 静态文件服务器有点问题，会导致graphql的playground崩溃
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../assets'),
    // }),
    UserModule,
    AuthModule,
    DockerModule,
    CPUModule,
    MemoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
