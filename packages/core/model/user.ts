import { vertify } from "../utils/decorate";

export class user {
	
    @vertify('username', 'String')
    @vertify('pwd', 'String')
    @vertify('email', 'EmailType')
	async create(username: string, pwd: string, email: string) {
		
	}
}