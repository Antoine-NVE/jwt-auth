export interface NewUser {
    username: string;
    password: string;
}

export interface User extends Omit<NewUser, 'password'> {
    id: string;
}
