import { Injectable } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {}

// code without strategy:

// export class AuthGuard implements CanActivate {
// 	constructor(
// 		private jwtService: JwtService,
// 		private configService: ConfigService
// 	) {}

// 	async canActivate(context: ExecutionContext): Promise<boolean> {
// 		const request = context.switchToHttp().getRequest();
// 		const token = this.extractTokenFromHeader(request);
// 		if (!token) {
// 			throw new UnauthorizedException();
// 		}
// 		try {
// 			const payload = await this.jwtService.verifyAsync(token, {
// 				secret: this.configService.get<string>('jwtKey'),
// 			});
// 			// We're assigning the payload to the request object here
// 			// so that we can access it in our route handlers
// 			request['user'] = payload;
// 		} catch {
// 			throw new UnauthorizedException();
// 		}
// 		return true;
// 	}

// 	private extractTokenFromHeader(request: any): string | undefined {
// 		const [type, token] = request.headers['authorization']?.split(' ') ?? [];
// 		return type === 'Bearer' ? token : undefined;
// 	}
// }
