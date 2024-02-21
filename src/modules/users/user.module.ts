import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { ProductModule } from '../products/product.module'
import { OrdersModule } from '../orders/orders.module'
import { DatabaseModule } from '../databases/database.module'
import { User, UserSchema } from './entities/user.entity'

@Module({
	imports: [
		ProductModule,
		OrdersModule,
		DatabaseModule,
		MongooseModule.forFeature([{
			name: User.name,
			schema: UserSchema
		}])
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})

export class UserModule { }
