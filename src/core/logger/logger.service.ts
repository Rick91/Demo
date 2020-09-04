import { injectable } from 'inversify';
import { Logger, createLogger } from 'winston';
import { DemoLoggerOptions } from './logger.interface';

@injectable()
export class LoggerService {

    private readonly logger: Logger;

    public constructor(options: DemoLoggerOptions) {
        this.logger = createLogger(options);
    }

    public info(message: string): Logger {
        return this.logger.info(message);
    }

    public warning(message: string): Logger {
        return this.logger.warn(message);
    }

    public error(message: string): Logger {
        return this.logger.error(message);
    }

    public debug?(message: string): Logger {
        return this.logger.debug(message);
    }

    public verbose?(message: string): Logger {
        return this.logger.verbose(message);
    }

}
