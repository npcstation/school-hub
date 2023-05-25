import { NotFoundError } from '../declare/error';
import { registerPerm } from '../declare/perm';
import { DefaultType } from '../declare/type';
import { db } from '../service/db';
import { verify } from '../utils/decorate';

interface CommentSchema {
    cid: number;
    did: number;
    author: string;
    content: string;
    createdTime: number;
    lastModified: number;
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

    @verify('did', DefaultType.Number)
    async list(did: number) {
        const data = await db.getall('comment', { did });
        return data;
    }

    @verify('cid', DefaultType.Number)
    async info(cid: number) {
        if ((await this.idExist(cid)) === false) {
            throw new NotFoundError('comment', 'cid');
        }
        const data = (await db.getone('comment', { cid })) as CommentSchema;
        return {
            author: data.author,
            content: data.content,
            time: data.createdTime,
        };
    }

    @verify('cid', DefaultType.Number)
    async find(cid: number) {
        if ((await this.idExist(cid)) === false) {
            throw new NotFoundError('comment', 'cid');
        }
        const data = (await db.getone('comment', { cid })) as CommentSchema;
        return data;
    }

    async create(data: CommentSchema) {
        const { did, author, content, createdTime, lastModified } = data;
        const cid = await this.genCommentId();
        await db.insert('comment', {
            cid,
            did,
            author,
            content,
            createdTime,
            lastModified,
        });
        return { cid };
    }

    @verify('cid', DefaultType.Number)
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
}

export const comment = new CommentModel();

export const commentPerm = registerPerm(
    'comment',
    ['view', 'modifyOwn', 'modifyAll', 'delete'],
    ['查看评论', '修改个人评论', '修改全部评论', '删除评论'],
    3,
    1
);
