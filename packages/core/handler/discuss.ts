import { Handler, Route } from '../handle';

class DiscussHandler extends Handler {
}

export function apply() {
    Route('Discuss', '/discuss/:id', DiscussHandler);
}