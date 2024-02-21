import { Test, TestingModule } from '@nestjs/testing'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config/config'

describe('AppController', () => {
	let appController: AppController

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [
				AppService,
				{
					provide: config.KEY,
					useValue: config,
				},
			],
		}).compile()

		appController = app.get<AppController>(AppController)
	})

	describe('root', () => {
		it('should return "Hello World!"', () => {
			expect(appController.mainRoute()).toBe('Hello World!')
		})
	})
})
