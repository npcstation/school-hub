import { Handler, Route } from '../handle';
import { user } from '../model/user';
import { RenderFromPage } from '../service/render';
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
                type: err?.errorType || 'unknow',
                msg: err.toString()
            }
        }
    }
}

class LoginHandler extends Handler {
    async get() {
        this.ctx.type = 'text/html';
        this.ctx.body = await RenderFromPage('index.html', {
            test: 'test2',
        });
    }
}

export function apply(ctx) {
    Route('SignUp', '/register', RegisterHandler);
    Route('SignIn', '/login', LoginHandler);
}
