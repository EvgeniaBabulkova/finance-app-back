import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	imports: [
		UsersModule,
		PassportModule.register({ defaultStrategy: 'jwt' }), // I need this, so i can link the strategy to the guard
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>('jwtKey'),
				signOptions: { expiresIn: '1h' },
			}),
		}),
	],
	exports: [JwtModule],
})
export class AuthModule {}
