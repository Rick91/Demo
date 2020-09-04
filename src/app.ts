import 'reflect-metadata';
import { DemoServer } from './server';
import { Container, interfaces } from 'inversify';
import * as winston from 'winston';

import { TYPES, ConfigurationService, LoggerService, loggerFormat, CacheService } from './core';
import { UserService } from './feature/users';

try {

    const container = new Container();
    container.bind<ConfigurationService>(TYPES.Config).to(ConfigurationService).inSingletonScope();
    container
        .bind<LoggerService>(TYPES.Logger)
        .toConstantValue(new LoggerService({
            format: winston.format.combine(winston.format.timestamp(), loggerFormat),
            transports: [
                new winston.transports.Console({
                    level: 'info',
                }),
            ],
        }));
    container
        .bind<CacheService>(TYPES.Cache)
        .toConstantValue(new CacheService({
            applicationName: 'Demo',
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
        }));
    container.bind<UserService>(TYPES.UserService).to(UserService).inTransientScope();

    const server = new DemoServer(container);
    const app = server.build();

    const logger = container.get<LoggerService>(TYPES.Logger);

    app.listen(process.env.PORT, () => { logger.info('Application start on port 3000')});
} catch (error) {
    console.log(error);
}