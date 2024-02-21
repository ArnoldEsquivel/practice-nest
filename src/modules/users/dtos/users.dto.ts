import {
	IsString,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsDate
} from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateUserDTO {
	@ApiProperty({
		description: 'The name of the user',
		example: 'Jhon Doe'
	})
	@IsString()
	@IsNotEmpty()
	readonly name: string

	@ApiProperty({
		description: 'The email of the user',
		example: 'jhon@mail.com'
	})
	@IsEmail()
	@IsNotEmpty()
	readonly email: string

	@ApiProperty({
		description: 'The password of the user',
		example: '123456'
	})
	@IsString()
	@IsNotEmpty()
	readonly password: string

	@ApiProperty({
		description: 'The URL of the user image',
		example: 'https://www.example.com/image.jpg'
	})
	@IsString()
	@IsOptional()
	readonly image: string

	@ApiProperty({
		description: 'The creation date of the user',
		example: '2021-01-01T00:00:00.000Z',
		default: new Date()
	})
	@IsDate()
	@IsOptional()
	readonly createdAt: Date

	@ApiProperty({
		description: 'The last update date of the user',
		example: '2021-01-01T00:00:00.000Z'
	})
	@IsDate()
	@IsOptional()
	readonly updatedAt: Date
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) { }