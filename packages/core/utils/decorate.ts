import { BasicType, Vertify } from "../declare/type";

export function param(params) {
    return function (target: any, methodName: string, descriptor: any) {
        if (descriptor.__param === undefined) {
            descriptor.__param = [];
            descriptor.originalMethod = descriptor.value;
        }
        descriptor.__param.unshift(params);
        descriptor.value = async function run(args: any) {
            return await descriptor.originalMethod.apply(this, descriptor.__param.map((key) => args[key]));
        };
    };
}


export function vertify(param, Type) {
    return function (target: any, methodName: string, descriptor: any) {
        if (descriptor.vertify === undefined) {
			descriptor.vertify = {};
			descriptor.originalMethod = descriptor.value;
			const codes = descriptor.value.toString();
			const paramList = codes.slice(codes.indexOf("(") + 1, codes.indexOf(")")).split(",");
			const paramNames = paramList.map((param) => param.trim());
			descriptor.paramNames = paramNames;
		}
		descriptor.vertify[descriptor.paramNames.indexOf(param)] = Type;
		descriptor.value = async function run(...args) {
            let VertifyFlag = true;
            for (let i in descriptor.vertify) {
                console.log(i);
                if (!Vertify(descriptor.vertify[i], args[i])) {
					VertifyFlag = false;
					break;
                }
            }
            //TODO throw type error.
			if (VertifyFlag === false) {
				console.log("vertify error");
				return;
            }

            return await descriptor.originalMethod.apply(this, args);
        };
    };
}