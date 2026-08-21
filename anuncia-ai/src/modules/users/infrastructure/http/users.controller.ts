import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/register-user.use-case';
import { UserAlreadyExistsError } from '../../application/errors/user-already-exists.error';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

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
}
