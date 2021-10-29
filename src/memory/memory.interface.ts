/**
 * 内存使用率的时序数据
 */
export interface MemoryTimeSeries {
  /**
   * 毫秒数时间戳
   */
  timestamp: number;
  /**
   * 内存使用率，精度为小数点后一位
   */
  usage: number;
  /**
   * 已使用的内存，单位bit
   */
  used: number;
  /**
   * 总内存，单位bit
   */
  total: number;
}
