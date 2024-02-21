import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
	@ApiProperty({
		description: 'The MongoDB ObjectId of the user',
		example: '5f2f8b3b9b3e3b1e6c3e8e3b',
	})
	@Prop()
	_id: string

	@ApiProperty({ required: true, description: "The name of the user" })
	@Prop({ required: true })
	name: string

	@ApiProperty({ required: true, description: "The email of the user" })
	@Prop({ unique: true })
	email: string

	@ApiProperty({ required: true, description: "The password of the user" })
	@Prop()
	password: string

	@ApiProperty({ description: "The URL of the user image" })
	@Prop()
	image: string

	@ApiProperty({ description: "The creation date of the user" })
	@Prop({ default: Date.now })
	createdAt: Date

	@ApiProperty({ description: "The last update date of the user" })
	@Prop({ default: Date.now })
	updatedAt: Date

	@ApiProperty({ description: "The deletion date of the user (soft delete)" })
	@Prop()
	deletedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
