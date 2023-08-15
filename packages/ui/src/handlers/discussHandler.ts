import { fetch } from '../interfaces/data';

interface CreateProp {
    token: string;
    topic: string;
    tags: string[];
    title: string;
    content: string;
}

interface CreateCommentProp {
    token: string;
    did: number;
    content: string;
}

interface InfoProp {
    did: number;
    limit: number;
    page: number;
}

interface RespondProp {
    token: string;
    did: number;
    emoji: string;
}

interface FetchRespondProp {
    did: number;
}

interface Response {
    status: 'success' | 'error';
    msg?: string;
    type?: string;
    data?: unknown;
    param?: string;
}

interface CreateComment extends Response {
    status: 'success' | 'error';
    msg?: string;
    type?: string;
    data?: {
        did: number;
    };
    param?: string;
}

interface CreateResponse extends Response {
    status: 'success' | 'error';
    msg?: string;
    type?: string;
    data?: {
        did: number;
    };
    param?: string;
}

interface RespondResponse extends Response {
    status: 'success' | 'error';
    msg?: string;
    type?: string;
    param?: string;
}

interface FetchRespondResponse extends Response {
    status: 'success' | 'error';
    msg?: string;
    responds?: {
        emoji: string;
        count: number;
    }
    type?: string;
    param?: string;
}

export interface CommentSchema {
    cid: number;
    did: number;
    authorId: number;
    content: string;
    createdTime: number;
    lastModified: number;
    responds: Record<string, Array<number>>;
    deleted: boolean;
    authorName: string;
    authorAvatar: string;
}

interface RespondProps {
    emoji: string;
    count: number;
    isSelected: boolean;
}

export interface DiscussSchema {
    did?: number;
    author: number;
    topic: string;
    tags: Array<string>;
    title: string;
    content: string;
    createdTime: number;
    lastModified: number;
    // responds: Record<string, Array<number>>;
    deleted: boolean;
    official: boolean;
    officialNotice: string;
    authorName: string;
    authorAvatar: string;
    commentCount: number;
    comments: CommentSchema[];
    parsedResponds: RespondProps[];
}

interface InfoResponse extends Response {
    status: 'success' | 'error';
    msg?: string;
    type?: string;
    data?: DiscussSchema;
    param?: string;
}

export const createError: {
    [key: string]: string | undefined;
} = {
    validation: '内容验证失败',
    perm: '无操作权限',
    unknown: '后端未知错误',
    default: '',
};

export const fetchDiscussError: {
    [key: string]: string | undefined;
} = {
    validation: '数据验证失败',
    perm: '无浏览权限',
    exist: '帖子不存在',
    unknown: '后端未知错误',
    default: '',
};

export async function handleCreateComment(commentData: CreateCommentProp): Promise<CreateComment> {
    const data = await fetch('discuss', 'createComment', commentData);
    return data;
}

export async function handleCreate(discussData: CreateProp): Promise<CreateResponse> {
    const data = await fetch('discuss', 'create', discussData);
    return data;
}

export async function handleInfo(infoData: InfoProp): Promise<InfoResponse> {
    const data = await fetch('discuss', 'info', infoData);
    return data;
}

export async function handleRespond(respondData: RespondProp): Promise<RespondResponse> {
    const data = await fetch('discuss', 'respond', respondData);
    return data;
}

export async function handleRevokeRespond(respondData: RespondProp): Promise<RespondResponse> {
    const data = await fetch('discuss', 'revokeRespond', respondData);
    return data;
}


export async function handleFetchResponds(fetchRespondData: FetchRespondProp): Promise<FetchRespondResponse> {
    const data = await fetch('discuss', 'fetchResponds', fetchRespondData);
    return data;
}
