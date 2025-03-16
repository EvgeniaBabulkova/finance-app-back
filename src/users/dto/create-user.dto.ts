import { IsString } from 'class-validator'; // Validation decorators

export class CreateUserDto {
	@IsString()
	username: string;

	@IsString()
	password: string;
}
