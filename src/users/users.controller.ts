import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(+id);
	}

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
	// 	return this.usersService.update(+id, updateUserDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.usersService.remove(+id);
	// }
}
