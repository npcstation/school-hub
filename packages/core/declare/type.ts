import { UserSchema } from '../model/user';

export class BasicType {
    verify(data: any): boolean {
        return true;
    }
}

export class EmailType extends BasicType {
    verify(data: any): boolean {
        if (typeof data !== 'string') {
            return false;
        }
        return data.includes('@');
    }
}

export class StringType extends BasicType {
    verify(data: any): boolean {
        return typeof data === 'string';
    }
}
export class NumberType extends BasicType {
    verify(data: any): boolean {
        return typeof data === 'number';
    }
}
export class BooleanType extends BasicType {
    verify(data: any): boolean {
        return typeof data === 'boolean';
    }
}

export class UserType extends BasicType {
    verify(data: any): boolean {
        return data instanceof UserSchema;
    }
}

export function Verify(Types, data) {
    return Types.verify(data);
}

export function NumberLimitIn(...prop) {
    return {
        verify: (data) => {
            if (typeof data !== 'number') {
                return false;
            }
            return prop.includes(data);
        },
    };
}

export const DefaultType = {
    Email: new EmailType(),
    Number: new NumberType(),
    String: new StringType(),
    Boolean: new BooleanType(),
    User: new UserType(),
};
