import { Test, TestingModule } from '@nestjs/testing'
import { ProductsController } from './products.controller'
import { ProductService } from '../services/product.service'
import { getModelToken } from '@nestjs/mongoose'
import { Product } from '../entities/product.entity'

describe('ProductsController', () => {
	let controller: ProductsController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductsController],
			providers: [
				ProductService,
				{
					provide: getModelToken(Product.name),
					useValue: Product,
				},
			],
		}).compile()

		controller = module.get<ProductsController>(ProductsController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
