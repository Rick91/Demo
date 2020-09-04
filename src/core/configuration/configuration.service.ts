import { injectable } from 'inversify';
import get from 'lodash.get';
import { isObject, isUndefined } from 'util';
import { NoInfer } from './types';

@injectable()
export class ConfigurationService<K = Record<string, any>> {

    private readonly internalConfig: Record<string, any>;

    public constructor() {
        this.internalConfig = this.assignVariablesToProcess();
    }

    get<T = any>(key: keyof K): T | undefined {
        const internalValue = get(this.internalConfig, key);

        if (!isUndefined(internalValue)) {
            const result = (internalValue as unknown) as T;
            return result;
        }

       return undefined;
    }

    private assignVariablesToProcess(): Record<string, any> {
        let config: Record<string, any> = {};

        config = {
            ... config,
            ... process.env
        };

        const keys = Object.keys(config).filter(key => !(key in process.env));
        keys.forEach(key => (process.env[key] = config[key]));

        return config;
    }
}