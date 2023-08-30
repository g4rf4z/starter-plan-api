import config from 'config';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export class CryptoService {
  generateRandomString(length: number): string {
    return crypto.randomBytes(length).toString('hex');
  }

  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
    return bcrypt.hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
