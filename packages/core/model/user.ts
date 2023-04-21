import { verify } from '../utils/decorate';
import { db } from '../service/db';
import { ExistError, NotFoundError } from '../declare/error';
import { isNull } from 'lodash';
import { DefualtType, NumberLimitIn } from '../declare/type';

export class usermodel {

    @verify('email', DefualtType.Email)
    @verify('username', DefualtType.String)
    @verify('pwd', DefualtType.String)
    @verify('grade', DefualtType.Number)
    @verify('gender', NumberLimitIn(0, 1))
    @verify('gravatarLink', DefualtType.String)
    @verify('description', DefualtType.String)
    async create(username: string, pwd: string, email: string, grade: number, gender: 0 | 1, gravatarLink: string, description: string) {
        if (await this.nameExist(username)) {
            throw new ExistError();
        }
        const id = await this.genId();
        await db.insert('user', {
            id,
            username,
            pwd,
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

    @verify('email', DefualtType.Email)
    @verify('username', DefualtType.String)
    @verify('pwd', DefualtType.String)
    @verify('grade', DefualtType.Number)
    @verify('gender', NumberLimitIn(0, 1))
    @verify('gravatarLink', DefualtType.String)
    @verify('description', DefualtType.String)
    async updateall(username: string, pwd: string, email: string, grade: number, gender: 0 | 1, gravatarLink: string, description: string) {
        if (await this.nameExist(username)) {
            throw new ExistError();
        }
        const id = this.genId();
        await db.insert('user', {
            id,
            username,
            pwd,
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

    @verify('id', DefualtType.Number)
    async update(id: number, data: any) {
        if ((await this.idExist(id)) === false) {
            //TODO: no exist error
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

    @verify('username', DefualtType.String)
    async nameExist(username: string) {
        return !isNull(
            await db.getone('user', {
                username,
            })
        );
    }

    @verify('id', DefualtType.Number)
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

    handle(data: any) {
        if (typeof data.gender === 'boolean') {
            data.gender = data.gender ? 'male' : 'female';
        }
        return data;
    }

    @verify('id', DefualtType.Number)
    async getbyId(id: number) {
        const idData = await db.getone('user', {
            id,
        });
        if (isNull(idData)) {
            throw new NotFoundError('id', id);
        }
        return this.handle(idData);
    }

    @verify('username', DefualtType.String)
    async getbyUsername(username: string) {
        const nameData = await db.getone('user', {
            username,
        });
        if (isNull(nameData)) {
            throw new NotFoundError('username', username);
        }
        return this.handle(nameData);
    }

    @verify('email', 'DefualtType.Email')
    async getbyEmail(email: string) {
        const emailData = await db.getone('user', {
            email,
        });
        if (isNull(emailData)) {
            throw new NotFoundError('email', email);
        }
        return this.handle(emailData);
    }
}

export const user = new usermodel();
