import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  date: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
