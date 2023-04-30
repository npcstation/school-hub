import * as _ from 'lodash';

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
}
