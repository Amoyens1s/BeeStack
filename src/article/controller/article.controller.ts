import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import {
  CreateArticleDTO,
  createArticleResponse,
} from '../dto/create-article.dto';
import { ArticleService } from '../service/article.service';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  hello() {
    return 'hello';
  }

  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.articleService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Get('post/:postID')
  async getPost(@Res() res, @Param('postID') postID) {
    const post = await this.articleService.getPost(postID);
    if (!post) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json(post);
  }

  @Post('post')
  @ApiBody({ type: CreateArticleDTO })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: createArticleResponse,
  })
  async addPost(
    @Body() createArticleDTO: CreateArticleDTO,
    @Res() res: Response,
  ) {
    const newPost = await this.articleService.addPost(createArticleDTO);
    return res.status(HttpStatus.OK).json(newPost);
  }
}
