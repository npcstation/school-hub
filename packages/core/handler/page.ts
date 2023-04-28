import { Handler, Route } from "../handle";
// import * as fs from 'fs';
// import * as path from 'path';
import { RenderFromPage } from "../service/render";

class MainPageHandler extends Handler {
    async get() {
        this.ctx.type = 'text/html';
        this.ctx.body = await RenderFromPage();
        return;
    }
}

export function apply() {
    Route('HomePage', '/', MainPageHandler);
}