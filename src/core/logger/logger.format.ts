import { format } from 'winston';
import * as os from 'os';
import * as process from 'process';

export const loggerFormat = format.printf(({ level, message, timestamp }) => {
    return `${level.toLocaleUpperCase()} ${timestamp} ${os.hostname()} ${process.pid} ${message}`;
});

