import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../admin/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.adminRepo.findOne({
      where: { username },
    });

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    const  { password: _, ...result } = user;
    return result;
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
  async seedAdmin() {
  const password = process.env.ADMIN_PASSWORD;
  const username = process.env.ADMIN_USERNAME;

  if (!password || !username) {
    throw new Error('ADMIN_USERNAME or ADMIN_PASSWORD not set in .env');
  }

  const existing = await this.adminRepo.findOne({
    where: { username },
  });

  if (!existing) {
    const hashed = await bcrypt.hash(password, 10);

    await this.adminRepo.save({
      username,
      password: hashed,
      role: 'admin',
    });

    console.log('✅ Admin seeded');
  }
}
}
