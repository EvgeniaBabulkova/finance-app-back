import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// the strategy handles token validation and payload extraction,
// while the guard focuses on protecting routes.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Replaces my extractTokenFromHeader method in the guard
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('jwtKey'), // from configuration.ts file
		});
	}

	async validate(payload: any) {
		return {
			id: payload.id,
			email: payload.email,
			// role: payload.role, // this is not good practice - check christian's slides
		};
	}
}
