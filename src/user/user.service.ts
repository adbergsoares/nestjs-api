import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.userCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findAll(findUserDto: FindUserDto) {
    const data: Prisma.userWhereInput = {
      ...findUserDto,
      password: undefined,
    };

    const foundAllUser = await this.prisma.user.findMany({
      where: data,
    });

    foundAllUser.forEach(function (element, index, array) {
      element.password = undefined;
      array[index] = element;
    });

    return {
      foundAllUser,
    };
  }

  async findOne(id: number) {
    const foundOneUser = await this.prisma.user.findUnique({
      where: { id },
    });

    return {
      ...foundOneUser,
      password: undefined,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const data: Prisma.userUpdateInput = {
      ...updateUserDto,
      password:
        typeof updateUserDto.password !== 'undefined'
          ? await bcrypt.hash(updateUserDto.password, 10)
          : undefined,
    };

    const updatedUser = await this.prisma.user.update({
      where: { id: id },
      data,
    });

    return {
      ...updatedUser,
      password: undefined,
    };
  }
}
