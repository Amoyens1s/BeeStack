import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { CPUModule } from './cpu/cpu.module';
import { DockerModule } from './docker/docker.module';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API 文档')
    .setDescription('前后端接口文档')
    .setVersion('1.0')
    .build();

  // swagger文档只提供RESTful API
  const options: SwaggerDocumentOptions = {
    include: [UserModule, AuthModule, CPUModule, DockerModule],
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
    customCssUrl: '/css/swagger.css',
  });

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
