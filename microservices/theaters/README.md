# Theater service

## Paul Shi (Stein0827) Github Id: #55637086

### Description

The Theater microservice is responsible for the CRUD operation for all of the Theaters. The data model includes id as string, the name of the theater as string, the address of the theater as string, the zip of the theater address as string, a description of the theater as string, the URL of the theater image as string, and lastly an array of numbers that stores the movieIds.

### Interactions

The Theater Microservice interacts with the theater identity microservice and movie operation microservice. The theater microservice will listen for a ```userCreated``` event sent by the theater identity service. The theater will then create a theater based on the give data from the userCreated event. The theater service also sends ```theaterCreated/theaterDeleted``` event back to the theater identity service for the theater identity service to update the theater informations. The theater service also sends a ```movieListUpdated``` event to inform the movie operation microservice to update the operation database.

### Endpoints

#### 1. Create Theater - POST theater:4009/api/v1/theater

##### Description

Add a theater to the theaters database.

##### Requests

```js
TheaterRequest = {
    theaterId: string | undefined;
    name: string | undefined;
    address: string | undefined;
    zip?: string;
    description?: string;
    theaterImage?: string;
    movies?: number[];
}
```

##### Response: Status(200, 400, 404)

```js
TheaterResponse = {
    theaterId: string | undefined;
    name: string | undefined;
    address: string | undefined;
    zip: string | undefined;
    description: string | undefined;
    theaterImage: string | undefined;
    movies: number[] | undefined;
}
or
TheaterError: {
 name: string
 message: string
 errorList: any[]
}
```

#### 2. Update Theater - PUT theaters:4009/api/v1/theater

##### Description

Update the theater in the databse if the theaterId is in database.

##### Requests

```js
TheaterRequest = {
    theaterId: string | undefined;
    name: string | undefined;
    address: string | undefined;
    zip: string | undefined;
    description: string | undefined;
    theaterImage: string | undefined;
    movies: number[] | undefined;
}
```

##### Response: Status(200, 400, 404)

```js
TheaterResponse = {
    theaterId: string | undefined;
    name: string | undefined;
    address: string | undefined;
    zip: string | undefined;
    description: string | undefined;
    theaterImage: string | undefined;
    movies: number[] | undefined;
}

or

theaterError: {
 name: string
 message: string
 errorList: any[]
}
```

#### 3. Get Theaters (BATCH) - POST theaters:4009/api/v1/theaters

##### Description

Get list of theaters based on an array of TheaterIds.

##### Requests

```js
TheaterGetBatchRequest: string[]
```

##### Response: Status(202, 404)

```js
TheaterBatchRequest: (TheaterResponse | TheaterError) []
```

#### 4. Get All theaters - GET theaters:4001/api/v1/theaters/all

##### Description

Return all the theaters in the theater database

##### Response: Status(200, 400, 404)

```js
TheaterResponses: TheaterResponse[]

or

TheaterError: {
 name: string
 message: string
 errorList: any[]
}
```

#### 5. Delete theater - DELETE theaters:4009/api/v1/theater

##### Description

Delete a theater if given theaterId is in database.

##### Requests

```js
TheaterId: string
```

##### Response: Status(200, 400, 404)

```js
acknowledgement: "item deleted"
or
TheaterErrro: {
 name: string
 message: string
 errorList: any[]
}
```

#### 6. updateMoviesOfTheater - PUT theaters:4009/api/v1/theater/movies

##### Description

update the movies list of a specific theater if the given theaterId is in database.

##### Requests

```js
TheaterRequest = {
    theaterId: string | undefined;
    movies: number[] | undefined;
}
```

##### Response: Status(200, 400, 404)

```js
TheaterResponse = {
    movieAdded: boolean;
    movie_id: number;
    theater_id: ObjectId;
}
or
TheaterErrro: {
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
