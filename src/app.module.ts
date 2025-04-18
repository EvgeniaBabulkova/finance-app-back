import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { EntriesModule } from './entries/entries.module';
import { dbConfig } from 'data.source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import configuration from './configuration';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
		TypeOrmModule.forRoot(dbConfig), //.options, new compared to slides

		CategoriesModule,
		EntriesModule,
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
