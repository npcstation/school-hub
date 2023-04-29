import { Route } from '../handle';
import { RenderFromPage } from '../service/render';
import { Context } from 'koa';

class MainPageHandler {
    async get(ctx: Context) {
        ctx.type = 'text/html';
        ctx.body = await RenderFromPage();
        return;
    }
}

export function apply() {
    Route('React', '/', 'get', new MainPageHandler().get);
    Route('React', '/login', 'get', new MainPageHandler().get);
}
