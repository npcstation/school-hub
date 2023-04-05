import { ValidatedError } from "../declare/error";
import { BasicType, Verify } from "../declare/type";

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
            for (let i in descriptor.verify) {
                if (!Verify(descriptor.verify[i], args[i])) {
					throw new ValidatedError(descriptor.verify[i]);
                }
            }
            return await descriptor.originalMethod.apply(this, args);
        };
    };
}