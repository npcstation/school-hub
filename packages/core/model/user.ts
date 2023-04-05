import { verify } from '../utils/decorate';
import { db } from '../service/db';
import { ExistError } from '../declare/error';

export class usermodel {

    @verify('email', 'EmailType')
    @verify('username', 'String')
    @verify('pwd', 'String')
    @verify('grade', 'Number')
    @verify('gender', 'Boolean')
    @verify('gravaterLink', 'String')
    @verify('description', 'String')
    async create(username: string, pwd: string, email: string, grade: number, gender: boolean, gravaterLink: string, description: string) {
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
            gravaterLink,
            description,
		});
		return {
			id
		};
    }

    @verify('email', 'EmailType')
    @verify('username', 'String')
    @verify('pwd', 'String')
    @verify('grade', 'Number')
    @verify('gender', 'Boolean')
    @verify('gravaterLink', 'String')
    @verify('description', 'String')
    async update(username: string, pwd: string, email: string, grade: number, gender: boolean, gravaterLink: string, description: string) {
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
            gravaterLink,
            description,
		});
		return {
			id
		};
	}
	
	async genId() {
		const newID = (await db.getone('count', { type: 'uid' }))?.count + 1 || 1;
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
        const idData = await db.getall(
            'user',
            {
                id,
            }
		);
        if (idData.length === 0) {
            throw new Error(); // TODO: Throw ID error
        }
        return this.handle(idData[0]);
    }
}

export const user = new usermodel();