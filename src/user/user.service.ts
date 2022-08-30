import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UnauthorizedError } from '../auth/errors/unauthorized.error';
import { ConflictException } from '../auth/errors/conflict.exception';
import { equals } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, currentUser: User): Promise<User> {
    if (currentUser.permission !== 'admin') {
      throw new UnauthorizedError('Unauthorized');
    }
    const data: Prisma.userCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(
        createUserDto.password,
        +process.env.SALT_ROUNDS,
      ),
    };

    if (typeof data.email !== 'undefined') {
      if (await this.findByEmail(data.email)) {
        throw new ConflictException('Email address is already in use.');
      }
    }

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findAll(findUserDto: FindUserDto, currentUser: User) {
    if (currentUser.permission !== 'admin') {
      throw new UnauthorizedError('Unauthorized');
    }
    const data: Prisma.userWhereInput = {
      ...findUserDto,
      password: undefined,
    };

    const foundAllUser = await this.prisma.user.findMany({
      where: data,
    });

    foundAllUser.map((x) => {
      x.password = undefined;
    });

    return {
      foundAllUser,
    };
  }

  async findOne(id: number, currentUser: User) {
    if (currentUser.permission !== 'admin' && currentUser.id !== id) {
      throw new UnauthorizedError('Unauthorized');
    }
    const foundOneUser = await this.prisma.user.findUnique({
      where: { id },
    });

    return {
      ...foundOneUser,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    currentUser: User,
  ): Promise<User> {
    if (Object.keys(updateUserDto).length <= 0) {
      throw new BadRequestException();
    }

    if (currentUser.permission !== 'admin' && currentUser.id !== id) {
      throw new UnauthorizedError('Unauthorized');
    }

    if (typeof updateUserDto.email !== 'undefined') {
      if (await this.findByEmail(updateUserDto.email)) {
        throw new ConflictException('Email address is already in use.');
      }
    }

    const data: Prisma.userUpdateInput = {
      ...updateUserDto,
      password:
        typeof updateUserDto.password !== 'undefined'
          ? await bcrypt.hash(updateUserDto.password, +process.env.SALT_ROUNDS)
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

  async validateEmail(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);

    if (user) {
      return true;
    }
    return false;
  }
}
