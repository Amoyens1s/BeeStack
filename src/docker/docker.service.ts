import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { remove } from 'lodash';
import { decodePayload } from '@tools';
import { Docker } from './docker.schema';
import * as Dockerode from 'dockerode';

@Injectable()
export class DockerService implements OnModuleInit {
  docker: Dockerode;

  constructor(
    @InjectModel('docker') private readonly dockerModel: Model<Docker>,
  ) {}

  onModuleInit() {
    this.docker = new Dockerode();
    this.docker.listImages();
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
      await this.dockerModel.findByIdAndUpdate(user._id, { token: validToken });
    });
  }

  async create(user: any) {
    user.token = [];
    return new this.dockerModel(user).save();
  }

  async findAll() {
    return this.dockerModel.find().exec();
  }

  async findOne(id: string) {
    try {
      return await this.dockerModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findByEmail(email: string) {
    return this.dockerModel
      .find()
      .exec()
      .then((userList) => {
        return userList.find((user) => user.email === email);
      });
  }

  async findByPhoneNumber(phoneNumber: number) {
    return this.dockerModel
      .find()
      .exec()
      .then((userList) => {
        return userList.find((user) => user.phone === phoneNumber);
      });
  }

  async update(id: string, updateUserDto: any) {
    return this.dockerModel.findByIdAndUpdate(id, updateUserDto);
  }

  async addToken(userId: string, token: string) {
    const user = await this.findOne(userId);
    user.token.push(token);
    return this.dockerModel.findByIdAndUpdate(userId, { token: user.token });
  }

  async removeToken(userId: string, token: string) {
    const user = await this.dockerModel.findById(userId).exec();
    if (user) {
      remove(user.token, (t) => t === token);
      await this.dockerModel.findByIdAndUpdate(userId, { token: user.token });
    } else {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    return this.dockerModel.findByIdAndRemove(id);
  }
}
