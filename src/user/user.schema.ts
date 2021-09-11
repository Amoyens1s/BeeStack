import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({
    required: true,
    type: String,
  })
  username: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;

  @Prop({
    required: true,
    type: String,
  })
  email: string;

  @Prop({
    required: false,
    type: Number,
  })
  phone: number;

  @Prop({
    required: true,
    type: String,
  })
  createDate: string;

  @Prop({
    required: true,
    type: Array,
  })
  role: string;

  @Prop({
    required: false,
    type: Array,
  })
  token: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
