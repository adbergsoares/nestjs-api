import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedError extends HttpException {
  constructor(objectOrError?: string | object | any, description = 'Conflict') {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.UNAUTHORIZED,
      ),
      HttpStatus.UNAUTHORIZED,
    );
  }
}
