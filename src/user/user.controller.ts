import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UserService } from './user.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('loadsession')
  loadsession(@Body() access_token: JSON,
    @CurrentUser() currentUser: User,
  ) {
    return this.userService.loadSession(access_token, currentUser);
  }

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.userService.create(createUserDto, currentUser);
  }

  @Get()
  findAll(@Body() findUserDto: FindUserDto, @CurrentUser() currentUser: User) {
    return this.userService.findAll(findUserDto, currentUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() currentUser: User) {
    return this.userService.findOne(+id, currentUser);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.userService.update(+id, updateUserDto, currentUser);
  }
}
