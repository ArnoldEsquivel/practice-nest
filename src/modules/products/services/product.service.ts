import { Injectable, NotFoundException } from '@nestjs/common'
import { Model, FilterQuery } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { Product } from '../entities/product.entity'
import { CreateProductDTO, UpdateProductDTO } from 'src/modules/products/dtos/products.dtos'
import { FilterProductsDTO } from 'src/modules/products/dtos/filter.dto'

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name) private productModel: Model<Product>
	) { }

	async getAll(): Promise<Product[]> {
		return await this.productModel.find().exec()
	}

	async getActives(): Promise<Product[]> {
		return await this.productModel.find({ deletedAt: null }).exec()
	}

	async getById(id: string): Promise<Product> {
		const product = await this.productModel.findById(id).exec()

		if (!product) throw new NotFoundException(`Product #${id} not found`)

		return product
	}

	async create(payload: CreateProductDTO): Promise<Product> {
		const newProduct = new this.productModel(payload)

		return newProduct.save()
	}

	async update(id: string, changes: UpdateProductDTO): Promise<Product> {
		const product = this.productModel
			.findByIdAndUpdate(id, { $set: changes }, { new: true })
			.exec()

		if (!product) throw new NotFoundException(`Product ${id} not found`)

		return product
	}

	async hardDelete(id: string): Promise<Product> {
		return this.productModel.findOneAndDelete({ _id: id }).exec()
	}

	async softDelete(id: string): Promise<Product> {
		return this.productModel.findByIdAndUpdate(id, { deletedAt: new Date() }).exec()
	}

	async restore(id: string): Promise<Product> {
		return this.productModel.findByIdAndUpdate(
			id,
			{ $unset: { deletedAt: 1 } },
			{ new: true }
		).exec()
	}

	async getFiltered(params?: FilterProductsDTO): Promise<Product[]> {
		if (params) {
			const filters: FilterQuery<Product> = {}
			const { limit, offset } = params
			const { minPrice, maxPrice } = params

			if (minPrice && maxPrice) filters.price = { $gte: minPrice, $lte: maxPrice }

			return this.productModel.find(filters).skip(offset).limit(limit).exec()
		}
		return this.productModel.find(params).exec()
	}
}
