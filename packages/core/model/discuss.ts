import { isNull } from 'lodash';
import { registerPerm } from '../declare/perm';
import { DefaultType } from '../declare/type';
import { db } from '../service/db';
import { verify } from '../utils/decorate';
import { NotFoundError } from '../declare/error';

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

    @verify('data', DefaultType.Discuss)
    async create(data: DiscussSchema) {
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
        });
        return {
            did,
        };
    }

    @verify('did', DefaultType.Number)
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

    @verify('idd', DefaultType.Number)
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

    @verify('did', DefaultType.Number)
    @verify('emoji', DefaultType.String)
    async respondWithDiscussId(did: number, emoji: string) {
        if ((await this.idExist(did)) === false) {
            throw new NotFoundError('discuss', 'did');
        }
        const data = await db.getone('discuss', { did });
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

    @verify('did', DefaultType.Number)
    async info(did: number) {
        if ((await this.idExist(did)) === false) {
            throw new NotFoundError('discuss', 'did');
        }
        const data = await db.getone('discuss', { did }) as DiscussSchema;
        return {
            author: data.author,
            commentsNumber: data.commentsNumber,
            time: data.createdTime,
        }
    }

    // TODO: sendcomment
    async sendComment(did: number, commentContent: any) {
        // TODO:
        
    }
}

export const discuss = new DiscussModel();

export const discussPerm = registerPerm(
    'user',
    ['view', 'modifyOwn', 'modifyAll', 'delete', 'action'],
    ['查看帖子', '修改个人发布', '修改全部发布', '删除帖子', '帖子交互'],
    3,
    1
);
