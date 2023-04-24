import { Handler, Route } from '../handle';
import { user } from '../model/user';
import { param } from '../utils/decorate';

class RegisterHandler extends Handler {
    @param('t')
    get(t: string) {
        this.ctx.body = 'Hello ' + t;
    }

    @param('username')
    @param('password')
    @param('gender')
    @param('grade')
    @param('email')
    @param('description')
    async postCreate(username: string, password: string, gender: string | number, grade: number, email: string, description: string) {
        try {
            var parsedGender: number = 0;
            if (typeof gender === 'string') {
                parsedGender = gender === 'female' ? 0 : 1;
            } else {
                parsedGender = gender;
            }
            const data = await user.create({
                username,
                pwd: password,
                email,
                grade,
                gender: parsedGender,
                gravatarLink: 'default',
                description: description || 'default',
            });
            this.ctx.body = {
                status: 'success',
                data,
            };
        } catch (err) {
            this.ctx.body = {
                status: 'error',
                type: err?.errorType || 'unknown',
                msg: err.toString(),
            };
        }
    }
}

export function apply(ctx) {
    Route('SignUp', '/register', RegisterHandler);
}
