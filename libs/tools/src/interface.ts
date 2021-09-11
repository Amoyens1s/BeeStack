export interface Payload {
  /**
   * 用户权限
   */
  role: string;
  /**
   * 用户ID
   */
  id: string;
  /**
   * 唯一标识符
   */
  hash: string;
  /**
   * 签发时间
   */
  iat: number;
  /**
   * 过期时间
   */
  exp: number;
}
