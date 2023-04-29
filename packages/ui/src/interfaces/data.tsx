import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetch(handler: string, data: any) {
    const datas = await axios.post(`/api/${handler}`, data);
    //TODO: Throw ERROR or handle error status.
    return datas.data;
}
