import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { parseToken } from '@tools';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.headers.authorization;
    if (!user) {
      // 如果未携带token，直接false
      return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [type, token] = user.split(' ');
    const role = parseToken(token).role;
    if (role === 'master') {
      return true;
    }
    if (role === roles[0]) {
      return true;
    }
    return false;
  }
}
