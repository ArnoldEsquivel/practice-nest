import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrdersService } from './services/orders.service'
import { OrdersController } from './controllers/orders.controller'
import { DatabaseModule } from '../databases/database.module';
import { Order, OrderSchema } from './entities/order.entity'

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{
      name: Order.name,
      schema: OrderSchema
    }])
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService]
})

export class OrdersModule { }
