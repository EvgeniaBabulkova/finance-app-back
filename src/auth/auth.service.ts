import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessages } from 'src/constants/error-messages';
import { LoginDto } from 'src/users/dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {} // always add the body - {}

	// to validate the user when logging in
	async validateUser(email: string, password: string): Promise<User> {
		const user: User = await this.usersService.findOneByEmail(email);
		if (!user) {
			throw new BadRequestException(ErrorMessages.USER_NOT_FOUND);
		}
		const isMatch: boolean = bcrypt.compareSync(password, user.password);
		if (!isMatch) {
			throw new BadRequestException(ErrorMessages.INVALID_CREDS);
		}
		return user;
	}

	async login(user: LoginDto): Promise<any> {
		try {
			const validatedUser = await this.validateUser(user.email, user.password);
			const payload = { id: validatedUser.id, email: validatedUser.email };
			const accessToken = this.jwtService.sign(payload);

			const userWithoutPassword = { ...JSON.parse(JSON.stringify(validatedUser)), password: undefined, access_token: accessToken };
			return {
				user: userWithoutPassword,
			};
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error;
			}
			throw new BadRequestException(ErrorMessages.INVALID_CREDS);
		}
	}

	async register(user: CreateUserDto): Promise<any> {
		try {
			// Check for existing user
			const existingUser = await this.usersService.findOneByEmail(user.email);
			if (existingUser) {
				throw new BadRequestException(ErrorMessages.EMAIL_EXISTS);
			}

			// Hash password and create user
			const hashedPassword = await bcrypt.hash(user.password, 10);
			const newUser = await this.usersService.create({
				...user,
				password: hashedPassword,
			});

			if (!newUser) {
				throw new InternalServerErrorException(ErrorMessages.UNKNOW_REGISTER_ERROR);
			}

			// Let login handle token generation and response formatting
			return this.login({
				email: user.email,
				password: user.password,
			});
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error;
			}

			// Log the actual error for debugging
			console.error('Registration error:', error);
			// Return a generic error message to the client
			throw new InternalServerErrorException(ErrorMessages.UNKNOW_REGISTER_ERROR);
		}

		// remove(id: number) {
		// 	return `This action removes a #${id} auth`;
		// }
	}
}
