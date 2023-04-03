import { BasicType, Verfiy } from "../declare/type";

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


export function verify(param, Type) {
    return function (target: any, methodName: string, descriptor: any) {
        if (descriptor.verify === undefined) {
			descriptor.verify = {};
			descriptor.originalMethod = descriptor.value;
			const codes = descriptor.value.toString();
			const paramList = codes.slice(codes.indexOf("(") + 1, codes.indexOf(")")).split(",");
			const paramNames = paramList.map((param) => param.trim());
			descriptor.paramNames = paramNames;
		}
		descriptor.verify[descriptor.paramNames.indexOf(param)] = Type;
		descriptor.value = async function run(...args) {
            let VerfiyFlag = true;
            for (let i in descriptor.verify) {
                console.log(i);
                if (!Verfiy(descriptor.verify[i], args[i])) {
					VerfiyFlag = false;
					break;
                }
            }
            //TODO throw type error.
			if (VerfiyFlag === false) {
				console.log("verify error");
				return;
            }

            return await descriptor.originalMethod.apply(this, args);
        };
    };
}