import { isNull } from 'lodash';
import { registerPerm } from '../declare/perm';
import { db } from '../service/db';
import { NotFoundError } from '../declare/error';
import { comment } from './comment';

export class DiscussSchema {
    did?: number;
    author: string;
    topic: string;
    tags: Array<string>;
    title: string;
    content: string;
    createdTime: number;
    lastModified: number;
    commentsNumber: number;
    responds: Record<string, Array<number>>;
    deleted: boolean;
}

type DiscussUpdatedSchema = Omit<Partial<DiscussSchema>, 'did'>;

export class DiscussModel {
    async genDId() {
        const newID = (await db.getone('count', { type: 'discussId' }))?.count + 1 || 1;
        if (newID === 1) {
            await db.insert('count', { type: 'discussId', count: newID });
        }
        await db.update('count', { type: 'discussId' }, { count: newID });
        return newID;
    }

    async create(data: Omit<DiscussSchema, 'did' | 'deleted'>) {
        const { author, topic, tags, title, content, createdTime, lastModified, responds } = data;
        const did = await this.genDId();
        await db.insert('discuss', {
            did,
            author,
            topic,
            tags,
            title,
            content,
            createdTime,
            lastModified,
            commentsNumber: 0,
            responds,
            deleted: false,
        });
        return {
            did,
        };
    }

    async idExist(did: number) {
        return !isNull(
            await db.getall(
                'discuss',
                {
                    did,
                },
                {}
            )
        );
    }

    async update(did: number, data: DiscussUpdatedSchema) {
        if ((await this.idExist(did)) === false) {
            throw new NotFoundError('discuss', 'did');
        }
        await db.update(
            'discuss',
            {
                did,
            },
            data
        );
        return;
    }

    async respondWithDiscussId(did: number, emoji: string) {
        if ((await this.idExist(did)) === false) {
            throw new NotFoundError('discuss', 'did');
        }
        const data = await db.getone('discuss', { did });
        if (data.deleted) {
            throw new NotFoundError('discuss', 'did');
        }
        const newCount = data.responds[emoji] + 1 || 1;
        data.responds[emoji] = newCount;
        await db.update(
            'discuss',
            {
                did,
            },
            data
        );
        return;
    }

    async info(did: number) {
        if ((await this.idExist(did)) === false) {
            throw new NotFoundError('discuss', 'did');
        }
        const data = (await db.getone('discuss', { did })) as DiscussSchema;
        if (data.deleted) {
            throw new NotFoundError('discuss', 'did');
        }
        return {
            author: data.author,
            commentsNumber: data.commentsNumber,
            time: data.createdTime,
        };
    }

    async find(did: number) {
        if ((await this.idExist(did)) === false) {
            throw new NotFoundError('discuss', 'did');
        }
        const data = (await db.getone('discuss', { did })) as DiscussSchema;
        if (data.deleted) {
            throw new NotFoundError('discuss', 'did');
        }
        return data;
    }

    async getResponds(did: number) {
        const data = (await db.getone('discuss', { did })) as DiscussSchema;
        if (data.deleted) {
            throw new NotFoundError('discuss', 'did');
        }
        return data.responds;
    }

    // TODO: sendcomment
    async sendComment(did: number, authorId: number, commentContent: string) {
        if ((await this.idExist(did)) === false) {
            throw new NotFoundError('discuss', 'did');
        }
        const data = (await db.getone('discuss', { did })) as DiscussSchema;
        if (data.deleted) {
            throw new NotFoundError('discuss', 'did');
        }
        const commentData = {
            did,
            authorId,
            content: commentContent,
            createdTime: Date.now(),
            lastModified: Date.now(),
            responds: {},
        };
        await comment.create(commentData);
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
