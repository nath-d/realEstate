// Setup environment variables from config.js (must be first)
import './config/env-from-config';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const config = require('../config');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable validation
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    // Enable CORS - allow any localhost port for development
    app.enableCors({
        origin: true, // Allow all origins in development
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
    });

    await app.listen(config.server.port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
