import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Category } from 'src/categories/entities/category.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Entry, Category])],
	controllers: [EntriesController],
	providers: [EntriesService],
})
export class EntriesModule {}
