export interface SubscribeRequest {
    url: string,
    events: string[]
}

export interface PublishRequest {
    eventType: string,
    eventData: object
}

export interface EventBus {
    [key: string]: string[]
}