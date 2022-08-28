import { User } from '../entities/user.entity';
import { Permission } from '../entities/user.permission';
import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @IsAlpha()
  name: string;

  @IsOptional()
  @Matches(/0[1-9]{2}[9]?[0-9]{8}$/, {
    message: 'phone must be a valid phone number',
  })
  phone: string;

  @IsEnum(Permission)
  permission: string;
}
