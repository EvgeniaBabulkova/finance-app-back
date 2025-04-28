import { IsEmail, IsString, MinLength } from 'class-validator';
import { Role } from '../../constants/Role';

export class UpdateUserDto {
	@IsString()
	@MinLength(3)
	username: string;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(3)
	password: string;

	role: Role;
}
