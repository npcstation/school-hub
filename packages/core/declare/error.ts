export class RError extends Error {
    public errorType;
}

export class ValidatedError extends RError {
    constructor(valuename: string) {
        super(`Validated Error. ${valuename} have not correct validated.`);
    }
    public errorType = 'validated';
}

export class ExistError extends RError {
    constructor() {
        super(`Exist Error.`);
    }
    public errorType = 'exist';
}

export class NotFoundError extends RError {
    constructor(key: string, value: string | number) {
        super(`Not Found Error. ${key} = ${value} not found.`);
    }
    public errorType = 'exist';
}
