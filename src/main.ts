import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());

	const port = process.env.PORT ?? 3000;

	// Add cleanup handler
	process.on('SIGTERM', async () => {
		await app.close();
		process.exit(0);
	});

	try {
		await app.listen(port);
		console.log(`Application is running on THIS CRAZY port ${port}`);
	} catch (error) {
		console.error('Failed to start server:', error.message);
		process.exit(1);
	}
}

bootstrap();
