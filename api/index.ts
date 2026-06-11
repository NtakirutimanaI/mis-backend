import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from '../src/app.module';
import { setupApp } from '../src/setup';

let cachedApp;

export default async function handler(req, res) {
    if (!cachedApp) {
        const server = express();
        const app = await NestFactory.create(
            AppModule,
            new ExpressAdapter(server),
            { logger: ['error', 'warn', 'log'] },
        );
        setupApp(app);
        await app.init();
        cachedApp = server;
    }
    cachedApp(req, res);
}
