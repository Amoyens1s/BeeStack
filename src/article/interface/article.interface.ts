import { ApiProperty } from '@nestjs/swagger';
import { CreateArticleDTO } from '../dto/create-article.dto';

export interface createArticle {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly author: string;
  readonly date: string;
}
