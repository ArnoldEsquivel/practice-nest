import {
    Get,
    // Put,
    Post,
    Body,
    // Query,
    // Param,
    // Delete,
    HttpCode,
    HttpStatus,
    Controller,
    // ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { CreateOrderDto } from '../dtos/order.dto'
import { OrdersService } from '../services/orders.service'
// import { Order } from '../entities/order.entity'

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    @ApiOperation({ summary: 'List of orders' })
    @HttpCode(HttpStatus.ACCEPTED)
    getAll() {
        return this.ordersService.getAll()
    }

    @Post()
    @ApiOperation({ summary: 'Create an order' })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() payload: CreateOrderDto) {
        return this.ordersService.create(payload)
    }
}
