import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Repository } from 'typeorm';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Injectable()
export class EntriesService {
	constructor(
		@InjectRepository(Entry)
		private readonly entryRepository: Repository<Entry>,
		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>
	) {}

	async create(createEntryDto: CreateEntryDto): Promise<Entry> {
		const { categoryId, ...entryData } = createEntryDto;
		const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
		if (!category) {
			throw new Error('Category not foundd!');
		}

		const entry = this.entryRepository.create({ ...entryData, category });
		return this.entryRepository.save(entry);
	}

	async findAll(): Promise<Entry[]> {
		return await this.entryRepository.createQueryBuilder('entry').leftJoinAndSelect('entry.category', 'category').getMany();
	}

	async findOne(id: number) {
		return await this.entryRepository.findOne({ where: { id } });
	}

	async update(id: number, updateEntryDto: UpdateEntryDto): Promise<Entry> {
		const { categoryId, ...entryData } = updateEntryDto;

		if (categoryId) {
			const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
			if (!category) {
				throw new Error('Category not found!');
			}
			entryData['category'] = category;
		}
		await this.entryRepository.update(id, entryData);
		return this.findOne(id);
	}

	// remove(id: number) {
	// 	return `This action removes a #${id} entry`;
	// }
}
