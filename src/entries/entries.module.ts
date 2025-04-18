import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Category } from 'src/categories/entities/category.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [TypeOrmModule.forFeature([Entry, Category]), AuthModule],
	controllers: [EntriesController],
	providers: [EntriesService],
})
export class EntriesModule {}
