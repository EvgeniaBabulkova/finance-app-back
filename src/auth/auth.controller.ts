import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() registerBody: CreateUserDto): Promise<CreateUserDto> {
		return await this.authService.register(registerBody);
	}

	@Post('login')
	async login(@Body() loginBody: LoginDto): Promise<any> {
		return this.authService.login(loginBody);
	}

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.authService.remove(+id);
	// }
}
