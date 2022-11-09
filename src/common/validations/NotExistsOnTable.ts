import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../services/prisma/prisma.service';

interface IRequest {
  table: string;
  field?: string;
  each?: boolean;
}

@ValidatorConstraint({ name: 'ExistsOnTable', async: true })
@Injectable()
export class NotExistsOnTableRule implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  async validate(fieldValue: string | string[], obj: ValidationArguments) {
    const options = obj.constraints[0] as IRequest;

    const validator = async (
      opt: IRequest,
      fieldValue: string,
    ): Promise<boolean> => {
      return !(await this.prisma[opt.table].findFirst({
        where: { [opt?.field || 'id']: fieldValue },
      }));
    };

    if (
      (options.each && !Array.isArray(fieldValue)) ||
      (!options.each && Array.isArray(fieldValue))
    ) {
      return false;
    }

    if (options.each && Array.isArray(fieldValue)) {
      for (let i = 0; i < fieldValue.length; i++) {
        if (!(await validator({ ...options }, fieldValue[i]))) return false;
      }
      return true;
    }

    return await validator({ ...options }, String(fieldValue));
  }

  defaultMessage() {
    return 'inválido';
  }
}

export function NotExistsOnTable(
  options: IRequest,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'NotExistsOnTable',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: NotExistsOnTableRule,
    });
  };
}
