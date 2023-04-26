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
    async postCreate(username: string, password: string, gender: string | number, grade: string, email: string, description: string) {
        try {
            var parsedGender: number = 0;
            if (typeof gender === 'string') {
                parsedGender = gender === 'female' ? 0 : 1;
            } else {
                parsedGender = gender;
            }
            const numGrade = parseInt(grade);
            const data = await user.create({
                username,
                pwd: password,
                email,
                grade: numGrade,
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

    @param('username')
    @param('password')
    @param('gender')
    @param('grade')
    @param('email')
    async postCreateUI(username: string, password: string, gender: string | number, grade: string, email: string) {
        console.log('233');
        try {
            var parsedGender: number = 0;
            if (typeof gender === 'string') {
                parsedGender = gender === 'female' ? 0 : 1;
            } else {
                parsedGender = gender;
            }
            const numGrade = parseInt(grade);
            const data = await user.create({
                username,
                pwd: password,
                email,
                grade: numGrade,
                gender: parsedGender,
                gravatarLink: 'default',
                description: 'default',
            });
            this.ctx.type = 'text/html';
            this.ctx.body = await RenderFromPage({
                type: 'back',
                template: 'Feedback',
                data: {
                    status: 'success',
                    title: `成功`,
                    msg: `您的提交已经成功。您的ID是:${data.id}`,
                    links: [
                        {
                            title: '返回主页',
                            link: '/',
                            style: 'light',
                        },
                    ],
                },
            });
        } catch (err) {
            console.log(err);
            this.ctx.type = 'text/html';
            this.ctx.body = await RenderFromPage({
                type: 'back',
                template: 'Feedback',
                status: 'error',
                data: {
                    status: 'error',
                    title: `错误`,
                    msg: `${err.errorType} Error. \n\n 若多次尝试仍然有问题请联系工作人员。`,
                    links: [
                        {
                            title: '返回登录',
                            link: '/login',
                        },
                        {
                            title: '联系帮助',
                            link: 'mailto:smallfang@rotriw.tech',
                            style: 'light',
                        },
                        {
                            title: '返回主页',
                            link: '/',
                            style: 'light',
                        },
                    ],
                },
            });
        }
    }
}

class LoginHandler extends Handler {
    async get() {
        console.log();
        this.ctx.type = 'text/html';
        this.ctx.body = await RenderFromPage();
    }
}

export function apply(ctx) {
    Route('SignUp', '/register', RegisterHandler);
    Route('SignUp-Id', '/register/:id', RegisterHandler);
    Route('SignIn', '/login', LoginHandler);
}
