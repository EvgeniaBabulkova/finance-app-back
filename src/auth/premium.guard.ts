import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from 'src/constants/Role';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PremiumUserGuard implements CanActivate {
	constructor(private usersService: UsersService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const userId = request.user?.id; // Extract the user ID from the JWT

		// If there's no user in the request, deny access
		if (!userId) return false;

		// Fetch user from the database using the extracted user ID
		const user = await this.usersService.findOne(userId);

		// Return true if user exists and has an Admin role, false otherwise
		return user && user.role === Role.PremiumUser;
	}
}
