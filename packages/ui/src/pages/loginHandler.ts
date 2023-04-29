import { fetch } from '../interfaces/data';

interface registerProp {
    email: string;
    grade: string;
    username: string;
    password: string;
    gender: string;
}

interface RegisterResponse {
    status: 'success' | 'error';
    msg?: string;
    type?: string;
    data?: {
        id: number;
    };
    param?: string;
}

export const registerError: {
    [key: string]: string | undefined;
} = {
    duplicate: '已存在的 ',
    validated: '未通过验证的注册信息',
    unknown: '后端未知错误',
    default: '',
    name: '用户名',
    email: '邮箱'
};

export async function handleRegister(userdata: registerProp): Promise<RegisterResponse> {
    const data = await fetch('register', 'create', userdata);
    return data;
}
