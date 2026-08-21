import { Inject, Injectable } from '@nestjs/common';
import { PASSWORD_HASHER } from '../domain/password-hasher';
import type { PasswordHasher } from '../domain/password-hasher';
import { User } from '../domain/user.entity';
import { USER_REPOSITORY } from '../domain/user.repository';
import type { UserRepository } from '../domain/user.repository';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  phone: string;
}

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(PASSWORD_HASHER) private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(input: RegisterUserInput): Promise<User> {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new UserAlreadyExistsError(input.email);
    }

    const passwordHash = await this.passwordHasher.hash(input.password);

    const user = User.create({
      name: input.name,
      email: input.email,
      passwordHash,
      phone: input.phone,
    });

    await this.userRepository.save(user);

    return user;
  }
}
