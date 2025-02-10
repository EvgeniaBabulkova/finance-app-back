import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>
	) {}

	create(createCategoryDto: CreateCategoryDto) {
		// const category = this.categoryRepository.create(createCategoryDto); // Uses DTO data
		return this.categoryRepository.save(createCategoryDto);
	}

	findAll() {
		return this.categoryRepository.find();
	}

	// findOne(id: number) {
	// 	return this.categoryRepository.findOne({ where: { id } });
	// }

	// update(id: number, updateCategoryDto: UpdateCategoryDto) {
	// 	this.categoryRepository.update(id, updateCategoryDto);
	// 	return this.findOne(id); // Return updated category
	// }

	// remove(id: number) {
	// 	 this.categoryRepository.delete(id);
	// }
}
