import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(response: string | string[]) {
    super(response, HttpStatus.BAD_REQUEST);
  }
}
