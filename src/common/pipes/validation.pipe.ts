import {
  PipeTransform,
  ArgumentMetadata,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'The given data was invalid.',
          errors: this.buildError(errors),
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return value;
  }

  // {
  //   target: CreateReceiptDTO {
  //     date: '2021-12-18T21:42:03.682Z',
  //     customer_id: '22748bba-3874-4899-b693-47e0001b221b',
  //     architect_id: 'Patricia',
  //     materials_and_tools_id: [ 'Cano de Cobre', 'Cano PVC' ],
  //     rooms: 'asd'
  //   },
  //   value: 'asd',
  //   property: 'rooms',
  //   children: [
  //     ValidationError {
  //       value: 'asd',
  //       property: 'rooms',
  //       target: [class CreateReceiptDTO],
  //       constraints: [Object]
  //     }
  //   ],
  //   constraints: { isArray: 'inválido' }
  // }

  // [
  //   ValidationError {
  //     target: CreateReceiptDTO {
  //       date: '2021-12-18T21:34:34.437Z',
  //       customer_id: '22748bba-3874-4899-b693-47e0001b221b',
  //       architect_id: 'Patricia',
  //       materials_and_tools_id: [Array],
  //       rooms: 'asd'
  //     },
  //     value: 'asd',
  //     property: 'rooms',
  //     children: [ [ValidationError] ],
  //     constraints: { isArray: 'inválido' }
  //   }
  // ]

  private buildError(errors) {
    const result = {};
    errors.forEach((item) => {
      const { property, constraints } = item;

      if (!constraints) {
        result[property] = 'error here, sorry for that :c';
      } else {
        result[property] = Object.values(constraints)[0];
      }
    });
    return result;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
