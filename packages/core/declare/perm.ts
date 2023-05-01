// import _ from 'lodash';

export class BasicPermModel {
    permlist: Array<string> = [];

    constructor(permlist: Array<string> = []) {
        this.permlist = permlist;
    }

    generate(list: Array<string>, mode: 'except' | 'require' = 'require') {
        // console.log(this.permlist);
        let res = 0;
        const len = this.permlist.length;
        for (let i = 0; i < len; i++) {
            const v = this.permlist[i];
            const status = +!(+list.includes(v) - +(mode === 'require'));
            // console.log(v, status);
            res = res | (status << i);
        }
        return res;
    }

    getPerm(value: number) {
        let count = 0;
        if (value === -1) {
            return this.permlist;
        }
        const res: Array<string> = [];
        // console.log(value);
        while (value > 0) {
            const v = value & 1;
            if (v === 1) {
                res.push(this.permlist[count]);
            }
            count++;
            value >>= 1;
        }
        // console.log(res);
        return res;
    }
}

export class Perm {
    value: number;
    handler: BasicPermModel;

    constructor(permlist: Array<string> = [], value = 0) {
        this.handler = new BasicPermModel(permlist);
        this.value = value;
    }

    getPerm() {
        return this.handler.getPerm(this.value);
    }

    addPerm(list: Array<string>, mode: 'except' | 'require' = 'require') {
        this.value = this.handler.generate(list, mode) | this.value;
    }

    delPerm(list: Array<string>, mode: 'except' | 'require' = 'require') {
        this.value = (this.handler.generate(list, mode) & this.value) ^ this.value;
    }

    checkPerm(perm: string) {
        return ((this.value >> this.handler.permlist.indexOf(perm)) & 1) === 1;
    }
}


export const permNameList = ['view', 'manage', 'action', 'other'];


export class ViewPerm extends Perm {
    constructor(value = 0) {
        super(viewPermList, value);
    }
}

export class ActionPerm extends Perm {
    constructor(value = 0) {
        super(managePermList, value);
    }
}

export class ManagePerm extends Perm {
    constructor(value = 0) {
        super(managePermList, value);
    }
}

export class OtherPerm extends Perm {
    constructor(value = 0) {
        super(otherPermList, value);
    }
}

export type PermType = 'view' | 'manage' | 'other' | 'action';

const viewPermC = new ViewPerm();
const managePermC = new ManagePerm();
const actionPermC = new ActionPerm();
const otherPermC = new OtherPerm();

export function checkPermFromValue(value: number, type: PermType, permName: string) {
    switch (type) {
        case 'view':
            viewPermC.value = value;
            return viewPermC.checkPerm(permName);
        case 'manage':
            managePermC.value = value;
            return managePermC.checkPerm(permName);
        case 'other':
            otherPermC.value = value;
            return otherPermC.checkPerm(permName);
        case 'action':
            actionPermC.value = value;
            return actionPermC.checkPerm(permName);
    }
}

export function checkPerm(
    value: {
        view: number;
        manage: number;
        other: number;
    },
    type: PermType,
    permName: string
) {
    switch (type) {
        case 'view':
            viewPermC.value = value.view;
            return viewPermC.checkPerm(permName);
        case 'manage':
            managePermC.value = value.manage;
            return managePermC.checkPerm(permName);
        case 'other':
            otherPermC.value = value.other;
            return otherPermC.checkPerm(permName);
        case 'action':
            actionPermC.value = value.other;
            return actionPermC.checkPerm(permName);
    }
}

//NOTE: 请注意 对于任意新的权限请在权限后面添加参数。
//NOTE: Notice that add new perm after exists.
export const viewExplain = '查看权限';
export const viewPermList = ['main', 'discuss', 'admin', 'chat'];
export const viewPermExplain = ['主站', '讨论', '后台', '私信'];
export const manageExplain = '管理权限';
export const managePermList = ['main', 'discuss', 'admin', 'chat'];
export const managePermExplain = ['主站', '讨论', '后台', '私信'];
export const actionExplain = '交互权限';
export const actionPermList = ['discuss', 'chat'];
export const actionPermExplain = ['讨论', '私信'];
export const otherExplan = '';
export const otherPermList = ['adminBadge', 'superadminBadge', 'permChange'];
export const otherPermExplain = ['显示管理徽章', '显示高级徽章', '权限管理'];
