import { BaseHttpController, controller, httpGet, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';


import { } from 'express';

import { TYPES } from '../../../core';
import { UserService } from '../service';

@controller('/users')
export class UsersController extends BaseHttpController {

    /**
     *
     */
    public constructor(@inject(TYPES.UserService) private readonly service: UserService) {
        super();
    }

    /**
     *
     * @param id
     */
    @httpGet('/:id')
    public async get(@requestParam('id') id: number) {
        const user = this.service.get(id);
        return this.ok(user);
    }
}