import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { decodePayload } from '@tools';
import { Payload } from '@tools/interface';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: Payload) {
    const user = await this.userService.findOne(payload.id);
    return user.token.find((token) => {
      return decodePayload(token).hash === payload.hash;
    });
  }
}
