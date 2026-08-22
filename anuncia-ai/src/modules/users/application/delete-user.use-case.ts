import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../domain/user.repository';
import { UserNotExistsError } from '../domain/errors/user-not-exists.error';
import type { UserRepository } from '../domain/user.repository';

export interface DeleteUserInput {
  email: string;
}

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(input: DeleteUserInput): Promise<void> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
        throw new UserNotExistsError(input.email);
    }

    user.delete();

    await this.userRepository.save(user);
  }
}
