import { isNull } from 'lodash';
import { registerPerm } from '../declare/perm';
import { DefaultType } from '../declare/type';
import { db } from '../service/db';
import { verify } from '../utils/decorate';
import { NotFoundError } from '../declare/error';

export class DiscussSchema {
    id?: number;
    author: string;
    topic: string;
    tags: Array<string>;
    title: string;
    content: string;
    createdTime: number;
    lastModified: number;
    responds: Record<string, Array<number>>;
}

type DiscussUpdatedSchema = Omit<Partial<DiscussSchema>, 'id'>

export class DiscussModel {
    async genId() {
        const newID = (await db.getone('count', { type: 'discussId' }))?.count + 1 || 1;
        if (newID === 1) {
            await db.insert('count', { type: 'discussId', count: newID });
        }
        await db.update('count', { type: 'discussId' }, { count: newID });
        return newID;
    }

    @verify('data', DefaultType.Discuss)
    async create(data: DiscussSchema) {
        const { author, topic, tags, title, content, createdTime, lastModified, responds } = data;
        const id = await this.genId();
        await db.insert('discuss', {
            id,
            author,
            topic,
            tags,
            title,
            content,
            createdTime,
            lastModified,
            responds,
        });
        return {
            id,
        };
    }

    @verify('id', DefaultType.Number)
    async idExist(id: number) {
        return !isNull(
            await db.getall(
                'discuss',
                {
                    id,
                },
                {}
            )
        );
    }

    @verify('id', DefaultType.Number)
    async update(id: number, data: DiscussUpdatedSchema) {
        if ((await this.idExist(id)) === false) {
            throw new NotFoundError('discuss', 'id');
        }
        await db.update(
            'discuss',
            {
                id,
            },
            data
        );
        return;
    }
}

export const discuss = new DiscussModel();


export const discussPerm = registerPerm(
    'discuss',
    ['view', 'modifyOwn', 'modifyAll', 'delete', 'action'],
    ['查看帖子', '修改个人发布', '修改全部发布', '删除帖子', '帖子交互'],
    3,
    1
);