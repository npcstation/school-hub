import { Handler, Route } from '../handle';
import { user } from '../model/user';
import { param } from '../utils/decorate';

class RegisterHandler extends Handler {
    @param('username')
    @param('password')
    @param('gender')
    @param('grade')
    @param('email')
    @param('description')
    async postCreate(username, password, gender, grade, email, description) {
        try {
            const data = await user.create(username, password, email, grade, gender, 'default', description || 'default');
            this.ctx.body = {
                status: 'success',
                data
            }
        } catch (err) {
            this.ctx.body = {
                status: 'error',
                type: err?.errorType || 'unknown',
                msg: err.toString()
            }
        }
    }
}

export function apply(ctx) {
    Route('SignUp', '/register', RegisterHandler);
}
