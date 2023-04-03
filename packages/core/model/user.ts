import { verify } from "../utils/decorate";

export class user {
		
    @verify("email", "EmailType")
    @verify("username", "String")
    @verify("pwd", "String")
    async create(username: string, pwd: string, email: string) {}
}