export interface IUser {
    name?: string | "user",
    email: string,
    password: string
}

export interface IUserParams {
    id: number
}