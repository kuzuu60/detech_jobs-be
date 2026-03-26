import { Injectable, UnauthorizedException } from '@nestjs/common';
import admin from '../../config/firebase';

@Injectable()
export class FirebaseAuthService {
  async verifyToken(token: string) {
    try {
      return await admin.auth().verifyIdToken(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }
}