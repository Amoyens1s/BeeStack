import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

describe('AuthService', () => {
  let service: AuthService;
  const testData: any = {
    _id: '60f27c34585bc83a2cb1f07f',
    username: 'Amoyensis',
    password: '123456',
    email: 'amoyensis@outlook.com',
    phone: 12345678921,
    createDate: '2021/07/11',
    __v: 0,
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue(testData),
            findByPhoneNumber: jest.fn().mockResolvedValue(testData),
          },
        },
      ],
    }).compile();

    service = app.get<AuthService>(AuthService);
  });

  it('邮箱登录，应当成功', async () => {
    const res = await service.validateUser(testData.email, testData.password);
    expect(res._id).toEqual(testData._id);
  });

  it('手机号登录，应当成功', async () => {
    const res = await service.validateUser(testData.phone, testData.password);
    expect(res._id).toEqual(testData._id);
  });

  it('生成token', async () => {
    const res = await service.login(testData, 10);
    expect(res).toBeTruthy();
  });
});
