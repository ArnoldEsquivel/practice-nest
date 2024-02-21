import {
	IsString,
	IsNumber,
	IsUrl,
	IsNotEmpty,
	IsPositive,
	IsDate,
	IsOptional
} from 'class-validator'
import { PartialType, ApiProperty } from '@nestjs/swagger'

export class CreateProductDTO {
	@ApiProperty({
		description: 'The name of the product',
		example: 'Example Name',
	})
	@IsString()
	@IsNotEmpty()
	readonly name: string

	@ApiProperty({
		description: 'The description of the product',
		example: 'Example Description',
	})
	@IsString()
	@IsOptional()
	readonly description: string

	@ApiProperty({
		description: 'The price of the product',
		example: 99.99,
	})
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	readonly price: number

	@ApiProperty({
		description: 'The stock of the product',
		example: 12,
	})
	@IsNumber()
	@IsNotEmpty()
	readonly stock: number

	@ApiProperty({
		description: 'The image of the product',
		example: 'https://i.imgur.com/uWYFyrO.jpeg',
	})
	@IsUrl()
	@IsOptional()
	readonly image: string

	@ApiProperty({
		description: 'The creation date of the product',
		example: '2021-01-01T00:00:00.000Z',
	})
	@IsDate()
	@IsOptional()
	readonly createdAt: Date

	@ApiProperty({
		description: 'The last update date of the product',
		example: '2021-01-01T00:00:00.000Z',
	})
	@IsDate()
	@IsOptional()
	readonly updatedAt: Date
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) { }