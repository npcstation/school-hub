import { sha512 } from 'js-sha512';
import { Route } from '../handle';
import { user } from '../model/user';
import { RenderFromPage } from '../service/render';
import { param } from '../utils/decorate';
import { Context } from 'koa';

function randomString(length: number): string {
    const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) {
        result += str[Math.floor(Math.random() * str.length)];
    }
    return result;
}

class RegisterHandler {
    async postCreate(ctx: Context, data: { username: string; password: string; gender: string | number; grade: string; email: string }) {
        try {
            let parsedGender = 0;
            if (typeof data.gender === 'string') {
                parsedGender = data.gender === 'female' ? 0 : 1;
            } else {
                parsedGender = data.gender;
            }
            const numGrade = parseInt(data.grade);
            const randomSalt = randomString(global.Project.config.salt.strength || 8);
            const configSalt = global.Project.config.salt.salt;

            const hashedPassword = sha512(data.password + randomSalt + configSalt);
            const result = await user.create({
                username: data.username,
                pwd: hashedPassword,
                salt: randomSalt,
                email: data.email,
                grade: numGrade,
                gender: parsedGender,
                gravatarLink: 'default',
                description: 'default',
            });
            ctx.body = {
                status: 'success',
                result,
            };
        } catch (err) {
            ctx.body = {
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

    async get(ctx: Context) {
        ctx.type = 'text/html';
        ctx.body = await RenderFromPage({
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function apply(_: Context) {
    Route('SignUp', '/api/register/create', 'post', new RegisterHandler().postCreate);
}
