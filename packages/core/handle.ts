import Koa, { Context } from 'koa';
import KoaBody from 'koa-body';
import bodyParser from 'koa-bodyparser';
import KoaRouter from 'koa-router';
import * as log4js from 'log4js';
import KoaStatic from 'awesome-static';
import * as path from 'path';
// import KoaConnect from 'koa-connect';
import { RenderFromPage } from './service/render';

export const app = new Koa();
const router = new KoaRouter();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('koa2-cors');

app.use(cors());
app.use(KoaBody());
app.use(bodyParser());
app.use(router.routes());

async function handle(ctx: Context, method: 'get' | 'post', handler) {
    if (method !== ctx.method.toLowerCase()) {
        ctx.body = '404 Not Found';
        ctx.response.status = 404;
        return;
    }
    const body = ctx.request.body;
    const args = {};
    Object.assign(args, body);
    Object.assign(args, ctx.params);
    Object.assign(args, ctx.request.query);
    try {
        // Check if args is empty
        if (Object.keys(args).length === 0) {
            await handler(ctx);
        } else {
            await handler(ctx, args);
        }
    } catch (err) {
        ctx.body = JSON.stringify({
            error: err,
        });
        ctx.response.status = 500;
    }
}

export function Route(name: string, link: string, method: 'get' | 'post', handler) {
    router.all(link, async (ctx, next) => {
        await handle(ctx, method, handler);
        next();
    });
}

export async function apply() {
    const handleLogger = log4js.getLogger('handler');
    handleLogger.level = global.Project.loglevel;
    if (global.Project.env === 'prod') {
        await app.use(
            KoaStatic(path.join(__dirname, '..', 'ui', 'dist', 'assets'), {
                route: 'assets',
            })
        );
    }
    await app.listen(global.Project.port);
    handleLogger.info(`Backend listen :${global.Project.port}`);
}
