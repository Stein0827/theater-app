# Confirmation service

## Paul Shi (Stein0827) Github Id: #55637086

### Description

The Confirmation microservice is responsible for the CRUD operation for all of the confirmations. The data model includes id as string, the movieid as string, the theaterid as string, and emails as string.

### Interactions

The confirmation Microservice interacts with the payment microservice. When the payment is sent, the payment microservice will send an ```paymentCreated``` event to the event bus. The confirmation service will then use the data inside the event and send the user a confirmation email.

### Endpoints

#### 1. Create confirmation - POST confirmations:4002/api/v1/confirmation

##### Description

Add a confirmation to the confirmations database.

##### Requests

```js
ConfirmationRequest = {
    confirmationId: string | undefined;
    movieId: number | undefined;
    theaterId: string | undefined; 
    creditCard: string | undefined;
    billingAddr: string | undefined;
    price: number | undefined;
    email: string | undefined;
}
```

##### Response: Status(200, 400, 404)

```js
ConfrimationResponse = {
    confirmationId: string | undefined;
    movieId: number | undefined;
    theaterId: string | undefined; 
    creditCard: string | undefined;
    billingAddr: string | undefined;
    price: number | undefined;
    email: string | undefined;
}
or
ConfirmationError: {
 name: string
 message: string
 errorList: any[]
}
```

#### 2. Get Confirmation (BATCH) - GET confirmations:4002/api/v1/confirmations

##### Description

Get list of Confirmations based on an array of confirmationIds.

##### Requests

```js
ConfirmationGetBatchRequest: string[]
```

##### Response: Status(202, 404)

```js
ConfirmationBatchRequest: (ConfirmationResponse | ConfirmationError) []
```

#### 3. Delete Confirmation - DELETE confirmations:4002/api/v1/confirmation

##### Description

Delete a confirmation if given confirmationId is in database.

##### Requests

```js
confirmationId: string
```

##### Response: Status(200, 400, 404)

```js
acknowledgement: "item deleted"
or
ConfirmationError: {
 name: string
 message: string
 errorList: any[]
}
```

#### 4. Event Listener - POST confirmations:4002:api/v1/event

##### Description

Listens for the paymentCreated event, which triggers the microservice to create a new confirmation in the database, and finally sends the confirmation email.

## Tutorial

In order to run the microservice and beyond, type

```
docker compose up
```

in the root directory of the repository in the terminal.

## Exceeding elements

In the microservice, we used MVC architeture to build the backend. It improves readability and simplifies the testing process. We also ran each query with extensive validation to ensure rigorous bug checking. On top of that I've utilized the nodemailer module in nodejs to send a confirmation email to the user after they purchased the ticket. 
