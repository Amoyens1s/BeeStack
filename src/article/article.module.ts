import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from './controller/article.controller';
import { ArticleSchema } from './mongo/article.schema';
import { ArticleService } from './service/article.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'article', schema: ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
