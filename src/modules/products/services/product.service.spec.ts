import { Test, TestingModule } from '@nestjs/testing'
import { ProductService } from './product.service'
import { getModelToken } from '@nestjs/mongoose'
import { Product } from '../entities/product.entity'

describe('ProductService', () => {
	let service: ProductService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductService,
				{
					provide: getModelToken(Product.name),
					useValue: Product,
				}
			],
		}).compile()

		service = module.get<ProductService>(ProductService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
