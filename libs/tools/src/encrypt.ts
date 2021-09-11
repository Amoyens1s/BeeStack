import { createHash } from 'crypto';

/**
 * 对指定字符串进行加盐加密
 * @param mode 加密模式
 * @param token 待加密字符串
 * @param salt 加盐
 * @returns 加密后的字符串
 * @example generateHash('md5', TokenString, 'This is a salt')
 */
export function encrypt(mode: string, token: string, salt: string) {
  return createHash(mode).update(token).update(salt).digest('hex');
}
