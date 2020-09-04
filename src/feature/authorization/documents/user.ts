export class User {

    firstName!: string;
    lastName!: string;
    username!: string;
    email!: string;
    password!: string;
    emailConfirmed!: boolean;
    displayName!: string;
    status!: number;
    accessFailedCount!: number;
    lockoutEnable!: boolean;
    lockoutEndDate?: Date;
    lastChangePasswordDate?: Date;
    creatationDate!: Date;
    modifiedDate?: Date;
    deletedDate?: Date;
}
