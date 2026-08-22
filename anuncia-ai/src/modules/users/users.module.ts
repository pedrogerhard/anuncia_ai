import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from './application/register-user.use-case';
import { PASSWORD_HASHER } from './domain/password-hasher';
import { USER_REPOSITORY } from './domain/user.repository';
import { BcryptPasswordHasher } from './infrastructure/security/bcrypt-password-hasher';
import { PrismaUserRepository } from './infrastructure/persistence/prisma-user.repository';
import { UsersController } from './infrastructure/http/users.controller';
import { DeleteUserUseCase } from './application/delete-user.use-case';

@Module({
  controllers: [UsersController],
  providers: [
    RegisterUserUseCase,
    DeleteUserUseCase,
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
    { provide: PASSWORD_HASHER, useClass: BcryptPasswordHasher },
  ],
})
export class UsersModule {}
