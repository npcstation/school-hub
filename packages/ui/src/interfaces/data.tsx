import * as axios from 'axios';

export async function fetch(handler: string, operation: string, data: any) {
    data.operation = operation;
    const datas = await axios.default.post(`${window.web?.link || ''}/${handler}`, data);
    //TODO: Throw ERROR or handle error status.
    return datas.data;
}
