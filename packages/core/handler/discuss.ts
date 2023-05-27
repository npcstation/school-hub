import { perm } from '../declare/perm';
import { DefaultType } from '../declare/type';
import { Handler, Route } from '../handle';
import { discuss } from '../model/discuss';
import { param } from '../utils/decorate';

class DiscussHandler extends Handler {
    @perm('discuss', 'view')
    @param('did', DefaultType.String)
    async postInfo(did: string) {
        try {
            const data = await discuss.find(parseInt(did));
            this.ctx.body = {
                status: 'success',
                data,
            };
        } catch (err) {
            this.ctx.body = {
                status: 'error',
                type: err?.errorType || 'unknown',
                param: err?.errorParam || '',
            };
        }
    }

    @perm('discuss', 'view')
    @param('did')
    async postFetchResponds(did: string) {
        try {
            const data = await discuss.getResponds(parseInt(did))
            this.ctx.body = {
                status: 'success',
                responds: data,
            };
        } catch (err) {
            this.ctx.body = {
                status: 'error',
                type: err?.errorType || 'unknown',
                param: err?.errorParam || '',
            };
        }
    }
}

export function apply() {
    Route('Discuss', '/discuss/:did', DiscussHandler);
}
