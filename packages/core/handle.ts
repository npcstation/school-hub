import Koa, { Context } from 'koa';
import KoaBody from 'koa-body';
import bodyParser from 'koa-bodyparser';
import KoaRouter from 'koa-router';
import * as log4js from "log4js";
// import cors from 'koa2-cors';
// import _ from 'lodash';

export const app = new Koa();
const router = new KoaRouter();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('koa2-cors');

app.use(cors());
app.use(KoaBody());
app.use(bodyParser());
app.use(router.routes());


type KoaContext = Context

function transWord(word :string) {
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    return firstLetterCap + remainingLetters
}

async function handle(ctx: KoaContext, Handler) {
	
    const body = ctx.request.body;
    const method = ctx.method.toLowerCase();
    let operation = '';
    if (method === 'post' && body?.operation !== '') {
        operation = transWord(body.operation);
    }
    const h = new Handler();
    const args = {};
    Object.assign(args, body);
    Object.assign(args, ctx.params);
    try {
        const steps = [
            method,
            ...operation ? [
                `post${operation}`,
            ] : [], 'after',
        ]
        let cur = 0;
        const length = steps.length;
		ctx.body = '';
		const _res = {};
        while (cur < length) {
            const step = steps[cur];
            cur ++;
            if (typeof h[step] === 'function') {
                const value = await h[step](args);
				if (value?.status) {
					Object.assign(_res, value);
					ctx.response.status = value.code || ctx.response.status || 200;
                }
            }
		}
		ctx.body = _res;
    } catch(err) {
		ctx.body = JSON.stringify({
			'error': err,
		});
        ctx.response.status = 500;
    }
}

export function Route(name :string, link :string, Handler) {
    router.all(link, async (ctx, next) => {
        await handle(ctx, Handler);
        next();
    });
}

export async function apply() {
    const handleLogger = log4js.getLogger("handler");
	handleLogger.level = global.Project.loglevel;
    await app.listen(global.Project.port);
    handleLogger.info(`Backend listen :${global.Project.port}`);
}
