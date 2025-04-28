import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import { AuthGuard } from './auth.guard';

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

	// The operation shouldn't be performed multiple times with the same result, therefore - POST
	// safest way to get the ID is from the jwt token, since it cant be modified by the client
	@UseGuards(AuthGuard)
	@Post('premium')
	async upgradeToPremium(@Req() req) {
		const userId = req.user.id; // Gets user ID from JWT token
		return await this.authService.goPremium(userId);
	}

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.authService.remove(+id);
	// }
}
