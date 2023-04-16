import { verify } from '../utils/decorate';
import { db } from '../service/db';
import { ExistError, NotFoundError } from '../declare/error';

export class usermodel {
    @verify('email', 'EmailType')
    @verify('username', 'String')
    @verify('pwd', 'String')
    @verify('grade', 'Number')
    @verify('gender', 'Boolean')
    @verify('gravatarLink', 'String')
    @verify('description', 'String')
    async create(
        username: string,
        pwd: string,
        email: string,
        grade: number,
        gender: boolean,
        gravatarLink: string,
        description: string
    ) {
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

    @verify('email', 'EmailType')
    @verify('username', 'String')
    @verify('pwd', 'String')
    @verify('grade', 'Number')
    @verify('gender', 'Boolean')
    @verify('gravatarLink', 'String')
    @verify('description', 'String')
    async updateall(
        username: string,
        pwd: string,
        email: string,
        grade: number,
        gender: boolean,
        gravatarLink: string,
        description: string
    ) {
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

    @verify('id', 'Number')
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
        const newID =
            (await db.getone('count', { type: 'uid' }))?.count + 1 || 1;
        if (newID === 1) {
            await db.insert('count', { type: 'uid', count: newID });
        }
        await db.update('count', { type: 'uid' }, { count: newID });
        return newID;
    }

    @verify('username', 'String')
    async nameExist(username: string) {
        return (
            (
                await db.getall(
                    'user',
                    {
                        username,
                    },
                    {}
                )
            ).length > 0
        );
    }

    @verify('id', 'Number')
    async idExist(id: number) {
        return (
            (
                await db.getall(
                    'user',
                    {
                        id,
                    },
                    {}
                )
            ).length > 0
        );
    }

    handle(data: any) {
        if (typeof data.gender === 'boolean') {
            data.gender = data.gender ? 'male' : 'female';
        }
        return data;
    }

    @verify('id', 'Number')
    async getbyId(id: number) {
        const idData = await db.getone('user', {
            id,
        });
        if (!idData) {
            throw new NotFoundError('id', id);
        }
        return this.handle(idData);
    }

    @verify('username', 'string')
    async getbyUsername(username: string) {
        const nameData = await db.getone('user', {
            username,
        });
        if (!nameData) {
            throw new NotFoundError('username', username);
        }
        return this.handle(nameData);
    }

    @verify('email', 'EmailType')
    async getbyEmail(email: string) {
        const emailData = await db.getone('user', {
            email,
        });
        if (!emailData) {
            throw new NotFoundError('email', email);
        }
        return this.handle(emailData);
    }
}

export const user = new usermodel();
