import { registerPerm } from '../declare/perm';

export class DiscussModel {
    
}

export const discuss = new DiscussModel();


export const discussPerm = registerPerm(
    'user',
    ['view', 'modifyOwn', 'modifyAll', 'delete', 'action'],
    ['查看帖子', '修改个人发布', '修改全部发布', '删除帖子', '帖子交互'],
    3,
    1
);