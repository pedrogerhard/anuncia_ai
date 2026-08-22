import { Body, ConflictException, Controller, Delete, GoneException, NotFoundException, Param, Post } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/register-user.use-case';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserAlreadyExistsError } from '../../domain/errors/user-already-exists.error';
import { DeleteUserUseCase } from '../../application/delete-user.use-case';
import { UserNotExistsError } from '../../domain/errors/user-not-exists.error';
import { UserAlreadyDeletedError } from '../../domain/errors/user-already-deleted.error';

@Controller('users')
export class UsersController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async register(@Body() dto: RegisterUserDto) {
    try {
      const user = await this.registerUserUseCase.execute(dto);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
      };
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Delete(':email')
  async delete(@Param('email') email: string) {
    try {
      await this.deleteUserUseCase.execute({ email });
    } catch (error) {
      if (error instanceof UserNotExistsError) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof UserAlreadyDeletedError) {
        throw new GoneException(error.message);
      }
      throw error;
    }
  }
}
