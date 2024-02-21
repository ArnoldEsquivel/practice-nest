import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductService } from './services/product.service'
import { ProductsController } from './controllers/products.controller'
import { DatabaseModule } from '../databases/database.module'
import { Product, ProductSchema } from './entities/product.entity'

@Module({
	imports: [
		DatabaseModule,
		MongooseModule.forFeature([{
			name: Product.name,
			schema: ProductSchema
		}])
	],
	controllers: [ProductsController],
	providers: [ProductService],
	exports: [ProductService],
})
export class ProductModule { }
