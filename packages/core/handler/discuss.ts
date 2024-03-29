import {perm} from '../declare/perm';
import {DefaultType} from '../declare/type';
import {Handler, Route} from '../handle';
import {DiscussSchema, RespondProps, discuss, DiscussListElementSchema} from '../model/discuss';
import {param} from '../utils/decorate';
import {token as tokenModel} from '../model/token';
import {CommentSchema, comment} from '../model/comment';
import {user} from '../model/user';

interface CommentSchemaExtra {
    authorName: string;
    authorAvatar: string;
}

interface DiscussSchemaExtra {
    authorName: string;
    authorAvatar: string;
    commentCount: number;
    comments: (CommentSchema & CommentSchemaExtra)[];
    parsedResponds: RespondProps[];
}

class DiscussHandler extends Handler {
    @perm('discuss', 'view')
    @param('did', DefaultType.Number)
    @param('limit', DefaultType.Number)
    @param('page', DefaultType.Number)
    @param('token', DefaultType.String)
    async postInfo(did: string, limit: string, page: string, token: string) {
        try {
            const requester = await tokenModel.stripId(token);

            const discussData = await discuss.find(parseInt(did));
            const author = await user.getbyId(discussData.author);
            const comments = await comment.listComments(parseInt(did), parseInt(limit), (parseInt(page) - 1) * parseInt(limit));
            const commentsWithName = await Promise.all(
                comments.map(async (comment) => {
                    const author = await user.getbyId(comment.authorId);
                    const data: CommentSchema & CommentSchemaExtra = {
                        ...comment,
                        authorName: author.username,
                        authorAvatar: author.gravatarLink,
                    };
                    return data;
                })
            );
            const commentCount = await comment.commentCount(parseInt(did));
            const respondData = await discuss.getResponds(parseInt(did), requester);
            // remove omit => will show respond user in ui
            const data: Omit<DiscussSchema, 'responds'> & DiscussSchemaExtra = {
                ...discussData,
                authorName: author.username,
                authorAvatar: author.gravatarLink,
                commentCount,
                comments: commentsWithName,
                parsedResponds: respondData,
            };
            this.ctx.body = {
                status: 'success',
                data,
            };
        } catch (err) {
            this.ctx.body = {
                status: 'error',
                type: err?.errorType || 'unknown',
                param: err?.errorParam || '',
            };
        }
    }

    @perm('discuss', 'view')
    @param('did', DefaultType.String)
    @param('token', DefaultType.String)
    async postFetchResponds(did: string, token: string) {
        try {
            const requester = await tokenModel.stripId(token);

            const data = await discuss.getResponds(parseInt(did), requester);
            this.ctx.body = {
                status: 'success',
                responds: data,
            };
        } catch (err) {
            this.ctx.body = {
                status: 'error',
                type: err?.errorType || 'unknown',
                param: err?.errorParam || '',
            };
        }
    }

    @perm('comment', 'view')
    @param('did', DefaultType.String)
    @param('limit', DefaultType.Number)
    @param('page', DefaultType.Number)
    // Page starts at 0
    async postFetchComments(did: string, limit: number, page: number) {
        try {
            if (limit > 50 || limit < 10) {
                limit = 20;
            }
            const data = await comment.listComments(parseInt(did), limit, page * limit);
            const dataWithName = await Promise.all(
                data.map(async (comment) => {
                    const author = await user.getbyId(comment.authorId);
                    const commentData: CommentSchema & CommentSchemaExtra = {
                        ...comment,
                        authorName: author.username,
                        authorAvatar: author.gravatarLink,
                    };
                    return commentData;
                })
            );
            this.ctx.body = {
                status: 'success',
                comments: dataWithName,
            };
        } catch (err) {
            this.ctx.body = {
                status: 'error',
                type: err?.errorType || 'unknown',
                param: err?.errorParam || '',
            };
        }
    }

    @perm('discuss', 'view')
    @param('token', DefaultType.String)
    @param('did', DefaultType.Number)
    @param('emoji', DefaultType.String)
    async postRespond(token: string, did: number, emoji: string) {
        try {
            const author = await tokenModel.stripId(token);
            await discuss.respondWithDiscussId(author, did, emoji);
            this.ctx.body = {
                status: 'success',
            };
        } catch (err) {
            this.ctx.body = {
                status: 'error',
                type: err?.errorType || 'unknown',
                param: err?.errorParam || '',
            };
        }
    }

    @perm('discuss', 'view')
    @param('token', DefaultType.String)
    @param('did', DefaultType.Number)
    @param('emoji', DefaultType.String)
    async postRevokeRespond(token: string, did: number, emoji: string) {
        try {
            const author = await tokenModel.stripId(token);
            await discuss.revokeRespondWithDiscussId(author, did, emoji);
            this.ctx.body = {
                status: 'success',
            };
        } catch (err) {
            this.ctx.body = {
                status: 'error',
                type: err?.errorType || 'unknown',
                param: err?.errorParam || '',
            };
        }
    }

    @perm('discuss', 'view')
    @param('token', DefaultType.String)
    @param('cid', DefaultType.Number)
    @param('emoji', DefaultType.String)
    async postRespondComment(token: string, cid: number, emoji: string) {
        try {
            const author = await tokenModel.stripId(token);
            const data = await comment.respondWithCommentId(author, cid, emoji);
            this.ctx.body = {
                status: 'success',
                responds: data,
            };
        } catch (err) {
            this.ctx.body = {
                status: 'error',
                type: err?.errorType || 'unknown',
                param: err?.errorParam || '',
            };
        }
    }

    @perm('discuss', 'modifyOwn')
    @param('token', DefaultType.String)
    @param('topic', DefaultType.String)
    @param('tags', DefaultType.Any)
    @param('title', DefaultType.String)
    @param('content', DefaultType.String)
    async postCreate(token: string, topic: string, tags: string[], title: string, content: string) {
        try {
            const author = await tokenModel.stripId(token);
            const data = await discuss.create({
                author,
                topic,
                tags,
                title,
                content,
                createdTime: Date.now() / 1000,
                lastModified: Date.now() / 1000,
                responds: {},
                deleted: false,
                official: false,
                officialNotice: '',
            });
            this.ctx.body = {
                status: 'success',
                data,
            };
        } catch (err) {
            this.ctx.body = {
                status: 'error',
                type: err?.errorType || 'unknown',
                param: err?.errorParam || '',
            };
        }
    }

    @perm('comment', 'modifyOwn')
    @param('token', DefaultType.String)
    @param('did', DefaultType.Number)
    @param('content', DefaultType.String)
    async postCreateComment(token: string, did: number, content: string) {
        if (content.length > 1000 || content.length <= 10) {
            this.ctx.body = {
                status: 'error',
                type: 'validation',
                param: 'content',
            };
            return;
        }

        try {
            const authorId = await tokenModel.stripId(token);
            const data = await comment.create({
                authorId,
                did,
                content,
                createdTime: Date.now() / 1000,
                lastModified: Date.now() / 1000,
                responds: {},
                deleted: false,
            });
            this.ctx.body = {
                status: 'success',
                data,
            };
        } catch (err) {
            this.ctx.body = {
                status: 'error',
                type: err?.errorType || 'unknown',
                param: err?.errorParam || '',
            };
        }
    }

    @perm('discuss', 'view')
    @param('limit', DefaultType.Number)
    @param('page', DefaultType.Number)
    async postHotDiscussList(limit: string, page: string) {
        try {
            const data: DiscussListElementSchema[] = await discuss.getRecentHotDiscuss(parseInt(limit), parseInt(page));
            const respData: (DiscussListElementSchema & CommentSchemaExtra)[] = []

            const count = await discuss.count();

            for (const datum of data) {
                const author = await user.getbyId(datum.author);
                const respDatum: DiscussListElementSchema & CommentSchemaExtra = {
                    ...datum,
                    authorName: author.username,
                    authorAvatar: author.gravatarLink,
                };
                respData.push(respDatum);
            }

            this.ctx.body = {
                status: 'success',
                count,
                data: respData,
            };
        } catch (err) {
            this.ctx.body = {
                status: 'error',
                type: err?.errorType || 'unknown',
                param: err?.errorParam || '',
            };
        }
    }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function apply() {
    Route('Discuss', '/discuss', DiscussHandler);
    Route('Discuss', '/discuss/:did', DiscussHandler);
}
