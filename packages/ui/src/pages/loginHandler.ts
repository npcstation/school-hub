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
}

export async function handleRegister(userdata: registerProp): Promise<RegisterResponse> {
    const data = await fetch('register', 'create', userdata);
    return data;
}
