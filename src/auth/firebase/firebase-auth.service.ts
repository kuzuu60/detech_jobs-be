import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthService {
  async verifyToken(token: string) {
    try {
      return await admin.auth().verifyIdToken(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }
}