export interface LoginRequest {
    username: string,
    password: string
}

export interface RegistrationRequest {
    username: string,
    password: string
}

export interface User {
    username: string,
    password: string,
    theaterId?: string
}