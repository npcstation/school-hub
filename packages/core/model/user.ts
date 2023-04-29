import { verify } from '../utils/decorate';
import { db } from '../service/db';
import { DuplicateError, NotFoundError } from '../declare/error';
import { isNull } from 'lodash';
import { DefaultType } from '../declare/type';

export class UserSchema {
    username: string;
    pwd: string;
    salt: string;
    email: string;
    grade: number;
    gender: number | string;
    gravatarLink: string;
    description: string;
}

export class UserUpdatedSchema {
    username?: string;
    pwd?: string;
    email?: string;
    grade?: number;
    gender?: number | string;
    gravatarLink?: string;
    description?: string;
}

export class UserModel {
    @verify('data', DefaultType.User)
    async create(data: UserSchema) {
        const { username, pwd, salt, email, grade, gender, gravatarLink, description } = data;
        if (await this.nameExist(username)) {
            throw new DuplicateError('name');
        }
        if (await this.emailExist(email)) {
            throw new DuplicateError('email');
        }
        const id = await this.genId();
        await db.insert('user', {
            id,
            username,
            pwd,
            salt,
            email,
            grade,
            gender,
            gravatarLink,
            description,
        });
        return {
            id,
        };
    }

    @verify('data', DefaultType.User)
    async updateall(data: UserSchema) {
        const { username, pwd, email, salt, grade, gender, gravatarLink, description } = data;
        if (await this.nameExist(username)) {
            throw new DuplicateError('name');
        }
        const id = this.genId();
        await db.insert('user', {
            id,
            username,
            pwd,
            salt,
            email,
            grade,
            gender,
            gravatarLink,
            description,
        });
        return {
            id,
        };
    }

    @verify('id', DefaultType.Number)
    async update(id: number, data: UserUpdatedSchema) {
        if ((await this.idExist(id)) === false) {
            throw new NotFoundError('user', 'id');
        }
        await db.update(
            'user',
            {
                id,
            },
            data
        );
        return;
    }

    async genId() {
        const newID = (await db.getone('count', { type: 'uid' }))?.count + 1 || 1;
        if (newID === 1) {
            await db.insert('count', { type: 'uid', count: newID });
        }
        await db.update('count', { type: 'uid' }, { count: newID });
        return newID;
    }

    @verify('username', DefaultType.String)
    async nameExist(username: string) {
        return !isNull(
            await db.getone('user', {
                username,
            })
        );
    }

    @verify('email', DefaultType.Email)
    async emailExist(email: string) {
        return !isNull(
            await db.getone('user', {
                email,
            })
        );
    }

    @verify('id', DefaultType.Number)
    async idExist(id: number) {
        return !isNull(
            await db.getall(
                'user',
                {
                    id,
                },
                {}
            )
        );
    }

    handle(data: UserUpdatedSchema) {
        if (typeof data.gender === 'boolean') {
            data.gender = data.gender ? 'male' : 'female';
        }
        return data;
    }

    @verify('id', DefaultType.Number)
    async getbyId(id: number) {
        const idData = await db.getone('user', {
            id,
        });
        if (isNull(idData)) {
            throw new NotFoundError('id', id);
        }
        return this.handle(idData as UserUpdatedSchema);
    }

    @verify('username', DefaultType.String)
    async getbyUsername(username: string) {
        const nameData = await db.getone('user', {
            username,
        });
        if (isNull(nameData)) {
            throw new NotFoundError('username', username);
        }
        return this.handle(nameData as UserUpdatedSchema);
    }

    @verify('email', DefaultType.Email)
    async getbyEmail(email: string) {
        const emailData = await db.getone('user', {
            email,
        });
        if (isNull(emailData)) {
            throw new NotFoundError('email', email);
        }
        return this.handle(emailData as UserUpdatedSchema);
    }
}

export const user = new UserModel();
