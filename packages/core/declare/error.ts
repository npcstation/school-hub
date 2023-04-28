export class RError extends Error {
    public errorType;
}

export class ValidationError extends RError {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(valuename: any) {
        super(`Validation Error. ${valuename.name || valuename.constructor.name} have not correct validated.`);
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
