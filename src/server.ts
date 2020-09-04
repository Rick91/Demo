import { Application } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

import '../src/feature/users/controllers/user.controller';

export class DemoServer {

    private server: InversifyExpressServer;

    public constructor(private readonly container: Container) {
        this.server = new InversifyExpressServer(this.container);
        this.initializeMiddlware();
        this.initializeErrorMiddleware();
    }

    public build(): Application {
        return this.server.build();
    }

    private initializeMiddlware(): void {
        this.server.setConfig((application: Application) => {});
    }

    private initializeErrorMiddleware(): void {
        this.server.setErrorConfig((application: Application) => {});
    }
}