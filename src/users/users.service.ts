import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	create(createUserDto: CreateUserDto) {
		console.log('POST /users route hittt');
		const user = this.userRepository.create(createUserDto);
		return this.userRepository.save(user);
	}

	async findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	findOne(id: number): Promise<User> {
		return this.userRepository.findOne({
			where: { id },
		});
	}

	async findOneByEmail(email: string): Promise<User> {
		return this.userRepository.findOne({ where: { email } });
	}
	// for later validation------------
	// async findOneByUsername(username: string): Promise<User> {
	// 	return this.userModel.findOne({ email }).exec();
	// }

	// update(id: number, UpdateUserDto: UpdateUserDto) {
	// 	return `This action updates a #${id} user`;
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} user`;
	// }
}
