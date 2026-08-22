import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'João Miguel',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: 'joao.miguel@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'SenhaForte@123',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: '+55 11 91234-5678',
  })
  @IsString()
  phone: string;
}
