import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User } from '../entities/user.entity'
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>
	) { }

	async getAll(): Promise<User[]> {
		return await this.userModel.find().exec()
	}

	async getById(id: string): Promise<User> {
		const user = await this.userModel.findById(id).exec()

		if (!user) throw new NotFoundException(`Product #${id} not found`)

		return user
	}

	async getActives(): Promise<User[]> {
		return await this.userModel.find({ deletedAt: null }).exec()
	}

	async create(payload: CreateUserDTO): Promise<User> {
		const existingUser = await this.userModel.findOne({ email: payload.email }).exec();

		if (existingUser) throw new ConflictException('Email already exists')

		const newUser = new this.userModel(payload)

		return newUser.save()
	}

	async update(id: string, changes: UpdateUserDTO): Promise<User> {
		const user = this.userModel
			.findByIdAndUpdate(id, { $set: changes }, { new: true })
			.select('name email')
			.exec()

		if (!user) throw new NotFoundException(`User ${id} not found`)

		return user
	}

	async hardDelete(id: string): Promise<User> {
		return await this.userModel.findOneAndDelete({ _id: id }).exec()
	}

	async softDelete(id: string): Promise<User> {
		return await this.userModel
			.findByIdAndUpdate(
				id,
				{ deletedAt: new Date() },
				{ new: true }
			)
			.exec();
	}

	async restore(id: string): Promise<User> {
		return await this.userModel.findByIdAndUpdate(
			id,
			{ $unset: { deletedAt: 1 } },
			{ new: true }
		).exec();
	}
}
