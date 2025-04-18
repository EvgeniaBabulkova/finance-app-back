import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/constants/Role';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private usersService: UsersService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRole = this.reflector.get<Role>('role', context.getHandler());
		if (!requiredRole) return true;

		const request = context.switchToHttp().getRequest();
		// Get fresh user data to check current role
		const user = await this.usersService.findOne(request.user.id);
		return user && user.role === Role.Admin;
	}
}
