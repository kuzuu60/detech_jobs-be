import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private users = [
    {
      id: 1,
      username: 'admin',
      password: bcrypt.hashSync('admin123', 10),
      role: 'admin',
    },
  ];

  async validateUser(username: string, password: string): Promise<any> {
    const user = this.users.find((u) => u.username === username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {

  const payload = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}
}
