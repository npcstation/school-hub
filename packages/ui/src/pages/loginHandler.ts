import { fetch } from "../interfaces/data";

interface registerProp {
    email: string;
    grade: string;
    username: string;
    password: string;
    gender: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handleRegister(userdata: registerProp, callback: (data: any) => void) {
    const data = await fetch('register', 'create', userdata);
    callback(data);
}