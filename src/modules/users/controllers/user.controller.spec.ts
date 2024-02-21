import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from '../services/user.service'
import { OrdersService } from '../../orders/services/orders.service'
import { getModelToken } from '@nestjs/mongoose'
import { User } from '../entities/user.entity'

describe('UserController', () => {
	let controller: UserController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				OrdersService,
				UserService,
				{
					provide: getModelToken(User.name),
					useValue: User,
				},
			],
		}).compile()

		controller = module.get<UserController>(UserController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
