import {
	Put,
	Get,
	Body,
	Post,
	Patch,
	Param,
	Delete,
	UsePipes,
	HttpCode,
	Controller,
	HttpStatus,
	BadRequestException,
} from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { UserService } from '../services/user.service'
import { OrdersService } from '../../orders/services/orders.service'
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto'
import { MongoIdPipe } from '../../../utils/pipes/mongo-id.pipe'

@ApiTags('Users')
@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly ordersService: OrdersService
	) { }

	@Get('actives')
	@ApiOperation({ summary: 'List of all users' })
	@HttpCode(HttpStatus.ACCEPTED)
	getActives() {
		return this.userService.getActives()
	}

	@Get(':id')
	@ApiOperation({ summary: "Get one user by id" })
	@HttpCode(HttpStatus.ACCEPTED)
	@UsePipes(MongoIdPipe)
	getById(@Param('id') id: string) {
		return this.userService.getById(id)
	}

	@Get()
	@ApiOperation({ summary: 'List of all users' })
	@HttpCode(HttpStatus.ACCEPTED)
	getAll() {
		return this.userService.getAll()
	}

	@Post()
	@ApiOperation({ summary: 'Create one user at the time' })
	create(@Body() payload: CreateUserDTO) {
		return this.userService.create(payload)
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update specified properties' })
	@HttpCode(HttpStatus.ACCEPTED)
	@UsePipes(MongoIdPipe)
	update(
		@Param('id') id: string,
		@Body() changes: UpdateUserDTO
	) {
		if (!changes || Object.keys(changes).length === 0) {
			throw new BadRequestException('The request body cannot be empty')
		}

		return this.userService.update(id, changes)
	}

	@Delete('soft/:id')
	@ApiOperation({ summary: '(Soft) Delete user by id' })
	@HttpCode(HttpStatus.ACCEPTED)
	@UsePipes(MongoIdPipe)
	softDelete(@Param('id') id: string) {
		return this.userService.softDelete(id)
	}

	@Delete(':id')
	@ApiOperation({ summary: '(Hard) Delete user by id' })
	@HttpCode(HttpStatus.ACCEPTED)
	@UsePipes(MongoIdPipe)
	hardDelete(@Param('id') id: string) {
		return this.userService.hardDelete(id)
	}

	@Put('restore/:id')
	@ApiOperation({ summary: 'Activate an deactivate user' })
	@HttpCode(HttpStatus.ACCEPTED)
	@UsePipes(MongoIdPipe)
	restore(@Param('id') id: string) {
		return this.userService.restore(id)
	}
}
