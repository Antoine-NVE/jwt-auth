export interface LoginUser {
    username: string;
    password: string;
}

export interface User extends Omit<LoginUser, 'password'> {
    id: string;
}
