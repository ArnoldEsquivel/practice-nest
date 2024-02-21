import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';

@Injectable()
export class EmailPipe implements PipeTransform {
  async transform(value: string) {
    const email = value
    const errors = await validate({email})
    
    if (errors.length > 0) {
      throw new BadRequestException('Email invalid')
    }

    return value;
  }
}
