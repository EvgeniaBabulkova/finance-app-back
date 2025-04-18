import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { AuthGuard } from 'src/auth/auth.guard';
// import { UpdateCategoryDto } from './dto/update-category.dto';
// import { Category } from './entities/category.entity';

@Controller('categories')
@UseGuards(AuthGuard) // Protect all routes in this controller
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Post()
	async create(@Body() createCategoryDto: CreateCategoryDto) {
		console.log('POST /a category route hittt');
		return await this.categoriesService.create(createCategoryDto);
	}

	@Get()
	async findAll() {
		console.log('GET /categories route hittt');
		return await this.categoriesService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
		console.log('GET /a category route hittt');
		return this.categoriesService.findOne(id);
	}

	@Patch(':id')
	async update(@Param('id', ParseIntPipe) id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
		console.log('PATCH /a category route hittt');
		return await this.categoriesService.update(+id, updateCategoryDto);
	}

	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: string): Promise<void> {
		console.log('DELETE /a category route hittt');
		return this.categoriesService.remove(+id);
	}
}
