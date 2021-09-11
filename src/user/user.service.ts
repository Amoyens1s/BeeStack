import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import { decode } from 'js-base64';
import { remove } from 'lodash';
import { decodePayload } from '@tools';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  onModuleInit() {
    setInterval(() => {
      this.removeInvalidToken();
    }, 5000);
  }

  async removeInvalidToken() {
    const date = new Date().getTime();
    const userList = await this.findAll();
    const validToken = [];
    userList.map(async (user) => {
      user.token.forEach((token) => {
        const payload = decodePayload(token);
        if (date < payload.exp) {
          validToken.push(token);
        }
      });
      await this.userModel.findByIdAndUpdate(user._id, { token: validToken });
    });
  }

  async create(user: CreateUserDto) {
    user.token = [];
    return new this.userModel(user).save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findByEmail(email: string) {
    return this.userModel
      .find()
      .exec()
      .then((userList) => {
        return userList.find((user) => user.email === email);
      });
  }

  async findByPhoneNumber(phoneNumber: number) {
    return this.userModel
      .find()
      .exec()
      .then((userList) => {
        return userList.find((user) => user.phone === phoneNumber);
      });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async addToken(userId: string, token: string) {
    const user = await this.findOne(userId);
    user.token.push(token);
    return this.userModel.findByIdAndUpdate(userId, { token: user.token });
  }

  async removeToken(userId: string, token: string) {
    const user = await this.userModel.findById(userId).exec();
    if (user) {
      remove(user.token, (t) => t === token);
      await this.userModel.findByIdAndUpdate(userId, { token: user.token });
    } else {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }
}
