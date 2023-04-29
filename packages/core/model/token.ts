import { db } from "../service/db";
import { v4 as uuidv4 } from 'uuid';
import { rdis } from "../service/redis";
import { isNull } from "lodash";


export class TokenModel {


    async create(id: number, expired: number) {
        const token = uuidv4();
        const create = Math.ceil(Date.now() / 1000);
        if (expired <= 7 * 24 * 60 * 60) {
            rdis.setjson(
                'token',
                token,
                {
                    id,
                    expired,
                    create
                },
                expired
            );
        }
        db.insert('token', {
            id,
            token,
            expired,
            create
        });
        return token;
    }

    async check(id: number, token: string): Promise<boolean> {
        let value = await rdis.getjson('token', token);
        let fromDatabase = false;
        if (typeof value.id === 'undefined') {
            value = await db.getone('token', { token });
            if (isNull(value)) {
                return false;
            }
            fromDatabase = true;
        }
        if (value.id !== id) {
            return false;
        }
        const now = Math.ceil(Date.now() / 1000);
        if (value.create + value.expired < now) {
            return false;
        }
        if (fromDatabase) {
            rdis.setjson(
                'token',
                token,
                {
                    id,
                    expired: value.expired,
                    create: value.create,
                },
                Math.min(7 * 24 * 60 * 60, now - (value.create + value.expired))
            );
        }
        return true;
    }
}
export const token = new TokenModel();