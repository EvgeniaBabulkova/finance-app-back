import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';
// import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Post()
	async create(@Body() createCategoryDto: CreateCategoryDto) {
		console.log('POST /categories route hittt');
		return await this.categoriesService.create(createCategoryDto);
	}

	@Get()
	async findAll() {
		console.log('GET /categories route hittt');
		return await this.categoriesService.findAll();
	}

	// @Get(':id')
	// async findOne(@Param('id', ParseIntPipe) id: number): Promise<Category | null> {
	// 	return this.categoriesService.findOne(id);
	// }

	// @Patch(':id')
	// async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
	// 	return this.categoriesService.update(id, updateCategoryDto);
	// }

	// @Delete(':id')
	// async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
	// 	return this.categoriesService.remove(id);
	// }
}
