import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Document, Types } from 'mongoose'

import { User } from '../../users/entities/user.entity'
import { Product } from '../../products/entities/product.entity'

@Schema()
export class Order extends Document {
	@ApiProperty({
		required: true,
		description: 'The user who created the order',
		example: 'See the example below'
	})
	@Prop({
		required: true,
		type: Types.ObjectId,
		ref: User.name
	})
	created_by: User | Types.ObjectId

	@ApiProperty({
		description: 'The products of the order',
		example: 'See the example below'
	})
	@Prop({ required: true, type: [{ type: Types.ObjectId, ref: Product.name }] })
	products: Types.Array<Product | Types.ObjectId>

	@ApiProperty({
		description: 'The moment when the order was created',
		example: new Date()
	})
	@Prop({ default: Date.now })
	created_at: Date

	@ApiProperty({
		description: 'The moment when the order was updated',
		example: new Date()
	})
	@Prop({ default: Date.now })
	updated_at: Date
}

export const OrderSchema = SchemaFactory.createForClass(Order)
