import { Controller, Get, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { Entry } from './entities/entry.entity';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('entries')
@UseGuards(AuthGuard) // Protect all routes in this controller
export class EntriesController {
	constructor(private readonly entriesService: EntriesService) {}

	@Post()
	async create(@Body() createEntryDto: CreateEntryDto): Promise<Entry> {
		return await this.entriesService.create(createEntryDto);
	}

	@Get()
	findAll() {
		return this.entriesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.entriesService.findOne(+id);
	}

	@Patch(':id')
	// everything in the url is a string, including the id, so the + converts it to a number
	update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
		return this.entriesService.update(+id, updateEntryDto);
	}

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.entriesService.remove(+id);
	// }
}
