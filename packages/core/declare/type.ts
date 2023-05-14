/* eslint-disable @typescript-eslint/no-explicit-any */
// import { UserSchema } from '../model/user';

export class BasicType {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        return (
            typeof data.username === 'string' &&
            typeof data.pwd === 'string' &&
            typeof data.email === 'string' &&
            typeof data.grade === 'number' &&
            (typeof data.gender === 'number' || typeof data.gender === 'string') &&
            typeof data.gravatarLink === 'string' &&
            typeof data.description === 'string'
        );
    }
}

export class DiscussType extends BasicType {
    verify(data: any): boolean {
        return (
            typeof data.author === 'string' &&
            typeof data.topic === 'string' &&
            typeof data.title === 'string' &&
            typeof data.content === 'string' &&
            typeof data.createdTime === 'number' &&
            typeof data.lastModified === 'number'
        );
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
    Discuss: new DiscussType(),
};
