import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform {
	transform(value: string) {
		const val = parseInt(value, 10)

		if (isNaN(val)) {
			throw new BadRequestException(`El valor ${value} no es un número`)
		}

		return val
	}
}
