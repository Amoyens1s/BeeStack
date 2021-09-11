import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API 文档')
    .setDescription('前后端接口文档')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    include: [UserModule, ArticleModule, AuthModule],
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
    customCssUrl: '/css/swagger.css',
  });

  await app.listen(3000);
}
bootstrap();
