import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToInstance(metatype, value);

    const errors = await validate(object);

    if (errors.length) {
      let messages = errors.map(
        (err) =>
          `${err.property} - ${Object.values(err.constraints).join(', ')}.`,
      );
      throw new ValidationException(messages);
    }

    return value;
  }
}
