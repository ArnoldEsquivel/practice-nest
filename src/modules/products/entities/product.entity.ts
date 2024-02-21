import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Product extends Document {
	@ApiProperty({
		required: true,
		description: 'The name of the product',
	})
	@Prop({ required: true })
	name: string;

	@ApiProperty({ description: 'The description of the product' })
	@Prop()
	description: string;

	@ApiProperty({
		required: true,
		minimum: 0,
		description: 'The price of the product'
	})
	@Prop({ required: true, min: 0 })
	price: number;

	@ApiProperty({
		required: true,
		minimum: 0,
		description: 'The available stock of the product'
	})
	@Prop({ required: true, min: 0 })
	stock: number;

	@ApiProperty({ description: 'The URL of the product image' })
	@Prop()
	image: string;

	@ApiProperty({ description: 'The creation date of the product' })
	@Prop({ default: Date.now })
	createdAt: Date;

	@ApiProperty({ description: 'The last update date of the product' })
	@Prop({ default: Date.now })
	updatedAt: Date;

	@ApiProperty({ description: 'The deletion date of the product (soft delete)' })
	@Prop()
	deletedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Este es un indice compuesto que ordena los productos por precio de forma ascendente y por stock de forma descendente
// esto ayuda a mejorar la busqueda de productos por estos campos
ProductSchema.index({ price: 1, stock: -1 })