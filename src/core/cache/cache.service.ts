import { isUndefined } from 'util';
import { CacheClientOptions } from './cache.interface';
import Redis from 'ioredis';
import { injectable } from 'inversify';

@injectable()
export class CacheService {

    private readonly client: Redis.Redis;

    /**
     *
     * @param options
     */
    public constructor(private readonly options: CacheClientOptions) {
        this.client = new Redis({
            host: options.host,
            port: options.port,
            db: 0,
        });
    }

    /**
     *
     * @param key
     * @param item
     * @param ttl
     */
    public async set<TItem>(key: string, item: TItem, ttl: number): Promise<void> {
        const cachedKey = `${this.options.applicationName}.${key}`;
        const json = JSON.stringify(item);
        await this.client.set(cachedKey, json, 'EX', ttl);
    }

    /**
     *
     * @param key
     */
    public async get<TItem>(key: string): Promise<TItem | undefined> {
        const cachedKey = `${this.options.applicationName}.${key}`;
        const item = await this.client.get(cachedKey);

        if (isUndefined(item)) {
            return undefined;
        }

        const result: TItem = JSON.parse(item);
        return result;
    }

    /**
     *
     * @param key
     */
    public async delete(key: string): Promise<void> {
        const cachedKey = `${this.options.applicationName}.${key}`;
        await this.client.del(cachedKey);
    }

    /**
     *
     * @param key
     * @param action
     * @param ttl
     */
    public async getOrCreate<TItem>(key: string, action: () => TItem, ttl: number): Promise<TItem | undefined> {
        const item: TItem | undefined = await this.get(key);

        if (item) {
            return item;
        } else {
            const actionResult = action();
            await this.set<TItem>(key, actionResult, ttl);
            return actionResult;
        }
    }
}
