export interface LoginRequest {
    username: string,
    password: string
}

export interface RegistrationRequest {
    username: string,
    password: string
}

export interface DeletionRequest {
    username: string
}

export interface User {
    username: string,
    password: string,
    theaterId?: string
}

export interface Event {
    eventType: string,
    eventData: object
}

export interface registerUserData {
    username: string,
    password?: string,
    name: string,
    address: string,
    zip: string,
    description: string,
    image: string,
}