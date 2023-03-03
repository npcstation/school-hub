export interface CreateUserDto {
  readonly name: string;
  readonly create_time: number;
  readonly pwd: string;
  readonly desc: string;
  readonly email: string;
  readonly role: number;
}
