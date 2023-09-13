import { Injectable } from '@nestjs/common';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { id: 1, name: 'me', email: 'me@me.com' },
    { id: 2, name: 'you', email: 'you@you.com' },
  ];

  findOneByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
