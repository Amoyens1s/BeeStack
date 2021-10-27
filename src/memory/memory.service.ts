import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mem } from 'systeminformation';

@Injectable()
export class MemoryService implements OnModuleInit {
  constructor(
    @InjectModel('memory') private readonly memoryModel: Model<any>,
  ) {}

  onModuleInit() {
    this.memoryModel.db.db
      .listCollections({ name: 'memories' })
      .next((err, info) => {
        if (info === null) {
          // 如果不存在名为memories的collection，则新创建一个，该collection为时序型
          this.memoryModel.createCollection(<any>{
            timeseries: {
              timeField: 'timestamp',
              metaField: 'metadata',
              granularity: 'seconds',
            },
            expireAfterSeconds: 604_800,
          });
        }
      });

    // 插入数据的demo
    // this.memoryModel.collection.insertMany([
    //   {
    //     metadata: { sensorId: 5578, type: 'temperature' },
    //     timestamp: new Date(),
    //     temp: 12,
    //   },
    //   {
    //     metadata: { sensorId: 5578, type: 'temperature' },
    //     timestamp: new Date(),
    //     temp: 11,
    //   },
    // ]);
  }

  async getMemory() {
    return mem();
  }
}
