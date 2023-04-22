import * as fs from 'fs';
import * as path from 'path';

export const templateHTML = {
    RenderHTML: '',
};

export async function RenderFromPage(pageid, data) {
    if (global.Project.env === 'prod') {
        console.log('qwq');
        return templateHTML['RenderHTML'].replace('<!--RENDER-->', `window.web = ${JSON.stringify(data)}`);
    } else {
        console.log('xx');
        
    }
}

export async function apply() {
    templateHTML['RenderHTML'] = (await fs.readFileSync(path.join(__dirname, '..', '..', 'ui', 'dist', 'index.html'))).toString();
}
