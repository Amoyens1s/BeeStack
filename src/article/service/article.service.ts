import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDTO } from 'src/article/dto/create-article.dto';
import { createArticle } from 'src/article/interface/article.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('article') private readonly articleModel: Model<createArticle>,
  ) {}

  async getPosts(): Promise<createArticle[]> {
    const posts = await this.articleModel.find().exec();
    return posts;
  }

  async getPost(postID): Promise<createArticle> {
    const post = await this.articleModel.findById(postID).exec();
    return post;
  }

  async addPost(createArticleDTO: CreateArticleDTO): Promise<createArticle> {
    const newPost = new this.articleModel(createArticleDTO);
    return newPost.save();
  }

  async editPost(
    postID,
    createArticleDTO: CreateArticleDTO,
  ): Promise<createArticle> {
    const editedPost = await this.articleModel.findByIdAndUpdate(
      postID,
      createArticleDTO,
      { new: true },
    );
    return editedPost;
  }

  async deletePost(postID): Promise<any> {
    const deletedPost = await this.articleModel.findByIdAndRemove(postID);
    return deletedPost;
  }
}
