import Koa, { Context } from 'koa';
import KoaBody from 'koa-body';
import bodyParser from 'koa-bodyparser';
import KoaRouter from 'koa-router';
import * as log4js from 'log4js';
import KoaStatic from 'awesome-static';
import * as path from 'path';
import KoaConnect from 'koa-connect';
const { renderPage } = require('vite-plugin-ssr/server');

export const app = new Koa();
const router = new KoaRouter();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('koa2-cors');

app.use(cors());
app.use(KoaBody());
app.use(bodyParser());
app.use(router.routes());

type KoaContext = Context;

function transWord(word: string) {
    const firstLetter = word.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = word.slice(1);
    return firstLetterCap + remainingLetters;
}

export class Handler {
    ctx: KoaContext;
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
    h.ctx = ctx;
    Object.assign(args, body);
    Object.assign(args, ctx.params);
    try {
        const steps = [method, ...(operation ? [`post${operation}`] : []), 'after'];
        let cur = 0;
        const length = steps.length;
        h.ctx.body = '';
        while (cur < length) {
            const step = steps[cur];
            cur++;
            if (typeof h[step] === 'function') {
                await h[step](args);
            }
        }
        ctx = h.ctx;
    } catch (err) {
        ctx.body = JSON.stringify({
            error: err,
        });
        ctx.response.status = 500;
    }
}

export function Route(name: string, link: string, Handler) {
    router.all(link, async (ctx, next) => {
        await handle(ctx, Handler);
        next();
    });
}

export async function apply() {
    const handleLogger = log4js.getLogger('handler');
    handleLogger.level = global.Project.loglevel;
    // if (global.Project.env === 'prod') {
    //     await app.use(KoaStatic(path.join(__dirname, '..', 'ui', 'dist', 'assets'), {
    //         route: 'assets'
    //     }));
    // }

    if (global.Project.env === 'prod') {
        app.use(
            KoaStatic(path.join(__dirname, '..', 'ui', 'dist', 'client', 'assets'), {
                route: 'assets',
            })
        );
    } else {
        const vite = await import('vite');
        const server = await vite.createServer({
            server: { middlewareMode: true },
            root: path.join(__dirname, '..', 'ui'),
        });
        app.use(KoaConnect(server.middlewares));
    }

    process.env.NODE_ENV = global.Project.env;

    app.use(async (ctx, next) => {
        const pageContextInit = {
            urlOriginal: ctx.request.url,
        };
        const pageContext = await renderPage(pageContextInit);
        const { httpResponse } = pageContext;
        if (!httpResponse) return next();
        const { body, statusCode, contentType, earlyHints } = httpResponse;
        if (ctx.response.writeEarlyHints) ctx.response.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
        ctx.response.statusCode = statusCode;
        ctx.response.type = contentType;
        ctx.body = body;
    });
    await app.listen(global.Project.port);
    handleLogger.info(`Backend listen :${global.Project.port}`);
}
