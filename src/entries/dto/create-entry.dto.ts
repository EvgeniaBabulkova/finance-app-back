import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEntryDto {
	id: number;

	@IsNotEmpty()
	@IsNumber()
	categoryId: number;

	@IsNotEmpty()
	@IsNumber()
	amount: number;

	@IsString()
	description: string;
}
