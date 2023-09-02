import {isNull} from 'lodash';
import {registerPerm} from '../declare/perm';
import {db} from '../service/db';
import {DuplicateError, NotFoundError, ValidationError} from '../declare/error';
import {comment} from './comment';

export class DiscussSchema {
    did?: number;
    author: number;
    topic: string;
    tags: Array<string>;
    title: string;
    content: string;
    createdTime: number;
    lastModified: number;
    // It is like {'😅': [1, 2, 3]}
    responds: Record<string, Array<number>>;
    deleted: boolean;
    official: boolean;
    officialNotice: string;
}

export class RespondProps {
    emoji: string;
    count: number;
    isSelected: boolean;
}

type DiscussUpdatedSchema = Omit<Partial<DiscussSchema>, 'did'>;

export class DiscussModel {
    async genDId() {
        const newID = (await db.getone('count', {type: 'discussId'}))?.count + 1 || 1;
        if (newID === 1) {
            await db.insert('count', {type: 'discussId', count: newID});
        }
        await db.update('count', {type: 'discussId'}, {count: newID});
        return newID;
    }

    async create(data: Omit<DiscussSchema, 'did'>) {
        const {author, topic, tags, title, content, createdTime, lastModified, responds, deleted, official, officialNotice} = data;
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
            deleted,
            official,
            officialNotice,
        });
        return {
            did,
        };
    }

    async idExist(did: number) {
        return !isNull(
            await db.getone(
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

    emojiCheck(emoji: string): boolean {
        const regex = /^\p{Emoji_Presentation}$/u;
        return regex.test(emoji);
    }

    async respondWithDiscussId(uid: number, did: number, emoji: string) {
        if (!this.emojiCheck(emoji)) {
            throw new ValidationError('emoji');
        }
        if ((await this.idExist(did)) === false) {
            throw new NotFoundError('discuss', 'did');
        }
        const data = (await db.getone('discuss', {did})) as DiscussSchema;
        if (data.deleted) {
            throw new NotFoundError('discuss', 'did');
        }
        const users = data.responds[emoji] || [];
        if (users.includes(uid)) {
            throw new DuplicateError('emoji');
        }
        users.push(uid);
        data.responds[emoji] = users;
        await db.update(
            'discuss',
            {
                did,
            },
            data
        );
        return;
    }

    async revokeRespondWithDiscussId(uid: number, did: number, emoji: string) {
        if (!this.emojiCheck(emoji)) {
            throw new ValidationError('emoji');
        }
        if ((await this.idExist(did)) === false) {
            throw new NotFoundError('discuss', 'did');
        }
        const data = (await db.getone('discuss', {did})) as DiscussSchema;
        if (data.deleted) {
            throw new NotFoundError('discuss', 'did');
        }
        const users = data.responds[emoji] || [];
        if (!users.includes(uid)) {
            throw new NotFoundError('discuss', 'uid');
        }
        users.splice(users.indexOf(uid), 1);
        if (users.length === 0) {
            delete data.responds[emoji];
        } else {
            data.responds[emoji] = users;
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

    async info(did: number) {
        if ((await this.idExist(did)) === false) {
            throw new NotFoundError('discuss', 'did');
        }
        const data = (await db.getone('discuss', {did})) as DiscussSchema;
        if (data.deleted) {
            throw new NotFoundError('discuss', 'did');
        }
        return {
            author: data.author,
            time: data.createdTime,
        };
    }

    async find(did: number): Promise<DiscussSchema> {
        if ((await this.idExist(did)) === false) {
            throw new NotFoundError('discuss', 'did');
        }
        const data = await db.getone('discuss', {did});
        delete data._id;
        if (data.deleted) {
            throw new NotFoundError('discuss', 'did');
        }

        return data;
    }

    async getResponds(did: number, requestUser: number) {
        const data = (await db.getone('discuss', {did})) as DiscussSchema;
        if (data.deleted) {
            throw new NotFoundError('discuss', 'did');
        }
        const responds: RespondProps[] = Object.entries(data.responds).map(([emoji, users]) => ({
            emoji,
            count: users.length,
            isSelected: users.includes(requestUser),
        }));
        return responds;
    }

    async sendComment(did: number, authorId: number, commentContent: string) {
        if ((await this.idExist(did)) === false) {
            throw new NotFoundError('discuss', 'did');
        }
        const data = (await db.getone('discuss', {did})) as DiscussSchema;
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
            deleted: false,
        };
        await comment.create(commentData);
        return;
    }

    async getHotDiscuss(limit: number, page: number): Promise<any> {
        const data = await db.aggregate('discuss', [
            {$match: {deleted: false}},
            {
                $lookup: {
                    from: 'comment', let: {did: '$did'}, pipeline: [
                        {$match: {$expr: {$eq: ['$did', '$$did']}}},
                        {$count: 'commentCount'},
                    ], as: 'commentCount'
                }
            },
            {$unwind: {path: '$commentCount', preserveNullAndEmptyArrays: true}},
            {$addFields: {commentCount: {$ifNull: ['$commentCount.commentCount', 0]}}},
            {$set: {commentCount: '$commentCount'}},
            {$sort: {commentCount: -1, did: -1}},
            {$unset: ['responds', 'deleted', '_id']},
            {$skip: limit * (page - 1)},
            {$limit: limit},
        ],);
        return data;
    }

    async getRecentHotDiscuss(limit: number, page: number): Promise<any> {
        const data = await db.aggregate('discuss', [
            {$match: {deleted: false}},
            {
                $lookup: {
                    from: 'comment', let: {did: '$did'}, pipeline: [
                        {$match: {$expr: {$eq: ['$did', '$$did']}}},
                        {$count: 'commentCount'},
                    ], as: 'commentCount'
                }
            },
            {
                $lookup: {
                    from: 'comment', let: {did: '$did'}, pipeline: [
                        {$match: {$expr: {$and: [{$eq: ['$did', '$$did']}, {$gt: ['$createdTime', Date.now() / 1000 - 15 * 24 * 60 * 60]}]}}},
                        {$count: 'recentCommentCount'},
                    ], as: 'recentCommentCount'
                }
            },
            {$unwind: {path: '$commentCount', preserveNullAndEmptyArrays: true}},
            {$unwind: {path: '$recentCommentCount', preserveNullAndEmptyArrays: true}},
            {$addFields: {commentCount: {$ifNull: ['$commentCount.commentCount', 0]}}},
            {$addFields: {recentCommentCount: {$ifNull: ['$recentCommentCount.recentCommentCount', 0]}}},
            {$set: {commentCount: '$commentCount'}},
            {$set: {recentCommentCount: '$recentCommentCount'}},
            {$sort: {recentCommentCount: -1, commentCount: -1, did: -1}},
            {$unset: ['responds', 'deleted', '_id']},
            {$skip: limit * (page - 1)},
            {$limit: limit},
        ],);
        return data;
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
