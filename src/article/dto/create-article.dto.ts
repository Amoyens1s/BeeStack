import { ApiProperty } from '@nestjs/swagger';
import { createArticle } from '../interface/article.interface';

export class CreateArticleDTO implements createArticle {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly author: string;
  readonly date: string;
}

export class createArticleResponse {
  @ApiProperty({
    description: '文章的标题',
    example: 'Learn Nest in 10 hours',
    type: 'string',
  })
  message: 'Post has been submitted successfully!';

  /**
   * Post  of create article response
   */
  post: CreateArticleDTO;
}
