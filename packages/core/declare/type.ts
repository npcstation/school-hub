export class BasicType {
	verify(data: any): boolean {
		return true;
	}
}

export class EmailType extends BasicType {
	verify(data: any): boolean {
		if (typeof data !== 'string') {
			return false;
		}
		return data.includes('@');
	}
}

export class StringType extends BasicType {
    verify(data: any): boolean {
        return typeof data === 'string';
    }
}
export class NumberType extends BasicType {
    verify(data: any): boolean {
        return typeof data === 'number';
    }
}

let TypeVerfiy = {};

export function registerType(typename, TypeClass: BasicType) {
	TypeVerfiy[typename] = {
		verify: TypeClass.verify
	};
}


export function Verfiy(typename, data) {
	if (typeof TypeVerfiy[typename] === 'undefined') {
		return true; // TODO: need good express
	}
	return TypeVerfiy[typename].verify(data);
}


registerType('EmailType', new EmailType());
registerType('Number', new NumberType());
registerType("String", new StringType());