import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

enum Permission {
  Admin = 'admin',
  Standard = 'standard',
}

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

  @IsString()
  name: string;

  @IsOptional()
  @Matches(/0[1-9]{2}[9]?[0-9]{8}$/, {
    message: 'phone must be a valid phone number',
  })
  phone: string;

  @IsEnum(Permission)
  permission: string;
}
