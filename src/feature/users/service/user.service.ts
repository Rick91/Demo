import { injectable } from 'inversify';

import { UserDto } from '../dto';

@injectable()
export class UserService {

    public get(id: number): UserDto {
        const result = new UserDto();
        result.firstName = 'Riccardo';
        result.lastName = 'Atzori';

        return result;
    }
}