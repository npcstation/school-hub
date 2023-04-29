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
    async postCreate(username: string, password: string, gender: string | number, grade: string, email: string) {
        try {
            let parsedGender = 0;
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

    // As Interface Demo
    /* deprecated */
    // @param('username')
    // @param('password')
    // @param('gender')
    // @param('grade')
    // @param('email')
    // async postCreateUI(username: string, password: string, gender: string | number, grade: string, email: string) {
    //     try {
            // let parsedGender = 0;
            // if (typeof gender === 'string') {
            //     parsedGender = gender === 'female' ? 0 : 1;
            // } else {
            //     parsedGender = gender;
            // }
            // const numGrade = parseInt(grade);
            // const data = await user.create({
            //     username,
            //     pwd: password,
            //     email,
            //     grade: numGrade,
            //     gender: parsedGender,
            //     gravatarLink: 'default',
            //     description: 'default',
            // });
    //         this.ctx.type = 'text/html';
    //         this.ctx.body = await RenderFromPage({
    //             type: 'back',
    //             template: 'Feedback',
    //             data: {
    //                 status: 'success',
    //                 title: `成功标题`,
    //                 msg: `成功文本。`,
    //                 links: [
    //                     {
    //                         title: 'link样式',
    //                         link: '/login',
    //                         style: 'light',
    //                     },
    //                 ],
    //             },
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         this.ctx.type = 'text/html';
    //         this.ctx.body = await RenderFromPage({
    //             type: 'back',
    //             template: 'Feedback',
    //             status: 'error',
    //             data: {
    //                 status: 'error',
    //                 title: `错误`,
    //                 msg: `${err.errorType} Error. \n\n 若多次尝试仍然有问题请联系工作人员。`,
    //                 links: [
    //                     {
    //                         title: '返回登录',
    //                         link: '/login',
    //                     },
    //                     {
    //                         title: '联系帮助',
    //                         link: 'mailto:smallfang@rotriw.tech',
    //                         style: 'light',
    //                     },
    //                     {
    //                         title: '返回主页',
    //                         link: '/',
    //                         style: 'light',
    //                     },
    //                 ],
    //             },
    //         });
    //     }
    // }

    async get() {
        this.ctx.type = 'text/html';
        this.ctx.body = await RenderFromPage({
            type: 'back',
            template: 'Feedback',
            status: 'error',
            data: {
                status: 'error',
                title: '错误',
                msg: '该页面无法直接访问。',
                links: [
                    {
                        title: '登录页',
                        link: '/login',
                    },
                    {
                        title: '主页',
                        link: '/',
                        style: 'light',
                    },
                ],
            },
        });
    }
}

class LoginHandler extends Handler {
    async get() {
        console.log();
        this.ctx.type = 'text/html';
        this.ctx.body = await RenderFromPage();
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function apply(ctx) {
    Route('SignUp', '/register', RegisterHandler);
    Route('SignUp-Id', '/register/:id', RegisterHandler);
    Route('SignIn', '/login', LoginHandler);
}
