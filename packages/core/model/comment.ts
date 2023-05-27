import { NotFoundError } from '../declare/error';
import { registerPerm } from '../declare/perm';
import { db } from '../service/db';

interface CommentSchema {
    cid: number;
    did: number;
    authorId: number;
    content: string;
    createdTime: number;
    lastModified: number;
    responds: Record<string, Array<number>>;
    deleted: boolean;
}

type CommentUpdatedSchema = Omit<Partial<CommentSchema>, 'cid' | 'did'>;

class CommentModel {
    async genCommentId() {
        const newID = (await db.getone('count', { type: 'commentId' }))?.count + 1 || 1;
        if (newID === 1) {
            await db.insert('count', { type: 'commentId', count: newID });
        }
        await db.update('count', { type: 'commentId' }, { count: newID });
        return newID;
    }

    async idExist(cid: number) {
        const data = await db.getone('comment', { cid });
        return data !== null;
    }

    async list(did: number) {
        const data = await db.getall('comment', { did });
        return data;
    }

    async info(cid: number) {
        if ((await this.idExist(cid)) === false) {
            throw new NotFoundError('comment', 'cid');
        }
        const data = (await db.getone('comment', { cid })) as CommentSchema;
        if (data.deleted) {
            throw new NotFoundError('comment', 'cid');
        }
        return {
            author: data.authorId,
            content: data.content,
            time: data.createdTime,
        };
    }

    async find(cid: number) {
        if ((await this.idExist(cid)) === false) {
            throw new NotFoundError('comment', 'cid');
        }
        const data = (await db.getone('comment', { cid })) as CommentSchema;
        if (data.deleted) {
            throw new NotFoundError('comment', 'cid');
        }
        return data;
    }

    async create(data: Omit<CommentSchema, 'cid' | 'deleted'>) {
        const { did, authorId, content, createdTime, lastModified, responds } = data;
        const cid = await this.genCommentId();
        await db.insert('comment', {
            cid,
            did,
            authorId,
            content,
            createdTime,
            lastModified,
            responds,
            deleted: false,
        });
        return { cid };
    }

    async update(cid: number, data: CommentUpdatedSchema) {
        if ((await this.idExist(cid)) === false) {
            throw new NotFoundError('comment', 'cid');
        }
        await db.update(
            'comment',
            {
                cid,
            },
            data
        );
        return;
    }

    async respondWithCommentId(cid: number, emoji: string) {
        if ((await this.idExist(cid)) === false) {
            throw new NotFoundError('comment', 'cid');
        }
        const data = await db.getone('comment', { cid });
        if (data.deleted) {
            throw new NotFoundError('comment', 'cid');
        }
        const newCount = data.responds[emoji] + 1 || 1;
        data.responds[emoji] = newCount;
        await db.update(
            'comment',
            {
                cid,
            },
            data
        );
        return;
    }

    async getResponds(cid: number) {
        const data = (await db.getone('comment', { cid })) as CommentSchema;
        if (data.deleted) {
            throw new NotFoundError('comment', 'cid');
        }
        return data.responds;
    }
}

export const comment = new CommentModel();

export const commentPerm = registerPerm(
    'comment',
    ['view', 'modifyOwn', 'modifyAll', 'delete'],
    ['查看评论', '修改个人评论', '修改全部评论', '删除评论'],
    3,
    1
);
