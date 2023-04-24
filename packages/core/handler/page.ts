import { Handler, Route } from "../handle";
import * as fs from 'fs';
import * as path from 'path';
import { RenderFromPage } from "../service/render";

class MainPageHandler extends Handler {
    
}

export function apply() {
    Route('HomePage', '/', MainPageHandler);
}