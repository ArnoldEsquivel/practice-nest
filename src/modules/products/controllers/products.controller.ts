import {
	Get,
	Put,
	Body,
	Post,
	Query,
	Patch,
	Param,
	Delete,
	HttpCode,
	UsePipes,
	HttpStatus,
	Controller,
	BadRequestException,
} from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { ProductService } from '../services/product.service'
import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dtos'
import { FilterProductsDTO } from '../dtos/filter.dto'
import { MongoIdPipe } from '../../../utils/pipes/mongo-id.pipe'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
	constructor(private readonly productService: ProductService) { }
	@Get('filter')
	@ApiOperation({ summary: 'Filter products' })
	@HttpCode(HttpStatus.ACCEPTED)
	getFiltered(@Query() params: FilterProductsDTO) {
		return this.productService.getFiltered(params)
	}

	@Get('actives')
	@ApiOperation({ summary: 'Get all active products' })
	@HttpCode(HttpStatus.ACCEPTED)
	getActives() {
		return this.productService.getActives()
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get one product' })
	@HttpCode(HttpStatus.ACCEPTED)
	@UsePipes(MongoIdPipe)
	getById(@Param('id') id: string) {
		return this.productService.getById(id)
	}

	@Get()
	@ApiOperation({ summary: 'List of products' })
	@HttpCode(HttpStatus.ACCEPTED)
	getAll() {
		return this.productService.getAll()
	}

	@Post()
	@ApiOperation({ summary: 'Create a product' })
	@HttpCode(HttpStatus.CREATED)
	create(@Body() payload: CreateProductDTO) {
		return this.productService.create(payload)
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update specified properties' })
	@HttpCode(HttpStatus.ACCEPTED)
	update(
		@Param('id', MongoIdPipe) id: string,
		@Body() changes: UpdateProductDTO
	) {
		if (!changes || Object.keys(changes).length === 0) {
			throw new BadRequestException('Empty payload')
		}

		return this.productService.update(id, changes)
	}

	@Delete('soft/:id')
	@ApiOperation({ summary: 'Soft delete a product' })
	@HttpCode(HttpStatus.ACCEPTED)
	@UsePipes(MongoIdPipe)
	softDelete(@Param('id') id: string) {
		return this.productService.softDelete(id)
	}

	@Delete(':id')
	@ApiOperation({ summary: '(Hard) Delete a product' })
	@HttpCode(HttpStatus.ACCEPTED)
	@UsePipes(MongoIdPipe)
	hardDelete(@Param('id') id: string) {
		return this.productService.hardDelete(id)
	}

	@Put('restore/:id')
	@ApiOperation({ summary: 'Restore a product' })
	@HttpCode(HttpStatus.ACCEPTED)
	@UsePipes(MongoIdPipe)
	restore(@Param('id') id: string) {
		return this.productService.restore(id)
	}
}
