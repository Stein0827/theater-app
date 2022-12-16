# Concessions service

## Paul Shi (Stein0827) Github Id: #55637086

### Description

The Concession microservice is responsible for the CRUD operation for all of the snack/drink items that is contained in the database. The data model includes a id as string, the name of the snack/drink as string, and the type of the snack as string, the price of the snack/drink as number, and an image URL stored as string.

### Interactions

The concession Microservice interacts with the frontend only. There's a list of concessions for the payment page to pull, the payment page will then display the data that was pulled from the concession service so the user can purchase any snack/drinks they want.

### Endpoints

#### 1. Create Concession - POST Concessions:4001/api/v1/concession

##### Description

Add a concession to the concessions database.

##### Requests

```js
ConcessionRequest = {
    snackId: string | undefined;
    name: string | undefined;
    type: string | undefined; 
    price: number | undefined;
    image: string | undefined;
}
```

##### Response: Status(200, 400, 404)

```js
ConcessionResponse = {
    snackId: string | undefined;
    name: string | undefined;
    type: string | undefined; 
    price: number | undefined;
    image: string | undefined;
}
or
ConcessionError: {
 name: string
 message: string
 errorList: any[]
}
```

#### 2. Update Concession - PUT concessions:4001/api/v1/concession

##### Description

Update the concession in the databse if the snackId is in database.

##### Requests

```js
ConcessionRequest = {
    snackId: string | undefined;
    name: string | undefined;
    type: string | undefined; 
    price: number | undefined;
    image: string | undefined;
}
```

##### Response: Status(200, 400, 404)

```js
ConcessionResponse = {
    snackId: string | undefined;
    name: string | undefined;
    type: string | undefined; 
    price: number | undefined;
    image: string | undefined;
}

or

ConcessionError: {
 name: string
 message: string
 errorList: any[]
}
```

#### 3. Get Concessions (BATCH) - POST concessions:4001/api/v1/concessions

##### Description

Get list of Concessions based on an array of snackIds.

##### Requests

```js
ConcessionGetBatchRequest: string[]
```

##### Response: Status(202, 404)

```js
ConcessionBatchRequest: (ConcessionResponse | ConcessionError) []
```

#### 4. Get All Concessions - GET concessions:4001/api/v1/concessions/all

##### Description

Return all the concessions in the concession database

##### Response: Status(200, 400, 404)

```js
ConcessionResponses: ConcessionResponse[]

or

ConcessionError: {
 name: string
 message: string
 errorList: any[]
}
```

#### 5. Delete concession - DELETE concessions:4001/api/v1/concession

##### Description

Delete a concession if given snackId is in database.

##### Requests

```js
concessionId: string
```

##### Response: Status(200, 400, 404)

```js
acknowledgement: "item deleted"
or
ConcessionError: {
 name: string
 message: string
 errorList: any[]
}
```

## Tutorial

In order to run the microservice and beyond, type

```
docker compose up
```

in the root directory of the repository in the terminal.

## Exceeding elements

In the microservice, we used MVC architeture to build the backend. It improves readability and simplifies the testing process. We also ran each query with extensive validation to ensure rigorous bug checking. 
