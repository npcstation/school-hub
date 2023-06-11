import { fetch } from '../interfaces/data';

interface CreateProp {
    token: string;
    topic: string;
    tags: string[];
    title: string;
    content: string;
}

interface InfoProp {
    did: number;
}

interface Response {
    status: 'success' | 'error';
    msg?: string;
    type?: string;
    data?: unknown;
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

interface InfoResponse extends Response {
    status: 'success' | 'error';
    msg?: string;
    type?: string;
    data?: {
        did?: number;
        author: number;
        topic: string;
        tags: Array<string>;
        title: string;
        content: string;
        createdTime: number;
        lastModified: number;
        responds: Record<string, Array<number>>;
        deleted: boolean;
        official: boolean;
        officialNotice: string;
        authorName: string;
        authorAvatar: string;
        commentCount: number;
        comments: CommentSchema[];
    };
    param?: string;
}

export const registerError: {
    [key: string]: string | undefined;
} = {
    duplicate: '已存在的 ',
    validation: '未通过验证的注册信息',
    unknown: '后端未知错误',
    default: '',
    name: '用户名',
    email: '邮箱',
};

export const loginError: {
    [key: string]: string | undefined;
} = {
    validation: '用户名或密码错误',
    unknown: '后端未知错误',
    default: '',
};

export async function handleCreate(discussData: CreateProp): Promise<CreateResponse> {
    const data = await fetch('discuss', 'create', discussData);
    return data;
}

export async function handleInfo(infoData: InfoProp): Promise<InfoResponse> {
    const data = await fetch('discuss', 'info', infoData);
    return data;
}
