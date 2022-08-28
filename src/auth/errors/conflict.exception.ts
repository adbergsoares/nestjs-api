import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor(objectOrError?: string | object | any, description = 'Conflict') {
    super(
      HttpException.createBody(objectOrError, description, HttpStatus.CONFLICT),
      HttpStatus.CONFLICT,
    );
  }
}
