import { createHash } from 'crypto';

/**
 * 生成唯一的随机hash散列字符串
 * @returns hash
 */
export function generateHash() {
  const current_date = new Date().valueOf().toString();
  const random = Math.random().toString();
  return createHash('sha256')
    .update(current_date + random)
    .digest('hex');
}
