import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from '../entities/order.entity'
import { CreateOrderDto } from '../dtos/order.dto'

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>
    ) { }

    async getAll(): Promise<Order[]> {
        return await this.orderModel
            .find()
            .populate([
                {
                    path: 'created_by',
                    model: 'User'
                },
                {
                    path: 'products',
                    model: 'Product'
                }
            ])
            .exec()
    }

    async create(data: CreateOrderDto): Promise<Order> {
        const newOrder = new this.orderModel(data)

        return newOrder.save()
    }
}
