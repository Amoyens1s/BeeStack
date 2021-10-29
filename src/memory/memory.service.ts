import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mem } from 'systeminformation';
import { MemoryTimeSeries } from './memory.interface';

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

    this.recordUsage();
  }

  async getMemory() {
    return mem();
  }

  async getUsage() {
    const data = await mem();
    return +((data.used / data.total) * 100).toFixed(1);
  }

  async getTotal() {
    return (await mem()).total;
  }

  async getUsed() {
    return (await mem()).used;
  }

  /**
   * 获取内存使用率时序数据
   * @param from 起始毫秒数
   * @param to 结束毫秒数
   * @returns  Promise<MemoryTimeSeries[]>
   */
  async getMemoryTimeSeries(
    from: number,
    to: number,
  ): Promise<MemoryTimeSeries[]> {
    return this.memoryModel.collection
      .find({
        timestamp: {
          $gt: new Date(from),
          $lt: new Date(to),
        },
      })
      .toArray();
  }

  recordUsage() {
    setInterval(async () => {
      this.memoryModel.collection.insertMany([
        {
          metadata: { type: 'memory_usage' },
          timestamp: new Date(),
          usage: await this.getUsage(),
          total: await this.getTotal(),
          used: await this.getUsed(),
        },
      ]);
    }, 1000);
  }
}
