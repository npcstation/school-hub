export class BasicType {
	vertify(data: any): boolean {
		return true;
	}
}

export class EmailType extends BasicType {
	vertify(data: any): boolean {
		if (typeof data !== 'string') {
			return false;
		}
		return data.includes('@');
	}
}

export class StringType extends BasicType {
    vertify(data: any): boolean {
        return typeof data === 'string';
    }
}
export class NumberType extends BasicType {
    vertify(data: any): boolean {
        return typeof data === 'number';
    }
}

let TypeVertify = {};

export function registerType(typename, TypeClass: BasicType) {
	TypeVertify[typename] = {
		vertify: TypeClass.vertify
	};
}


export function Vertify(typename, data) {
	if (typeof TypeVertify[typename] === 'undefined') {
		return true; // TODO: need good express
	}
	return TypeVertify[typename].vertify(data);
}


registerType('EmailType', new EmailType());
registerType('Number', new NumberType());
registerType("String", new StringType());