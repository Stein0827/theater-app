# Movie Operations Microservice
## Alan Castillo (#59078415 - aacastillo)

### Description
The Movies Operations Microservice is responsible dealing with movie showing times for each theater. For example "Elf" might be playing at `2:30pm and 3:00pm` at one theater but different times in another theater. Movie Operations microservice is responsible for tracking and modifying these discrepencies. It also deals with capacity. For example a theater might be playing "Elf", but it is only able sell 30 tickets due to restrictions in space.

### Interactions
The Movies Operations interacts with the theaters microservice closely. When a theater is deleted, created, or adds a movie, then Movie Operations must be updated.

### Endpoints
#### 1. Respond to Events - POST movieops:4003/api/v1/event
##### Description: 
Responds to events received from the eventbus

##### Requests:
```js
Event: {
	eventType: string
	eventData: {
		movieAdded: boolean;  
		movie_id: number;  
		theater_id: string;
		zip: string
	}
}
```

##### Response: Status( 200, 400, 404)
```js
MovieResponse: string
MovieOpsError: {
	name: string
	message: string
	errorList: any[]
}
```

#### 2. Create Operations - POST movieops:4003/api/v1/operations
##### Description: 
Create operations for given theater and movie.

##### Requests:
```js
OperationsRequest: {  
	movie_id: number | undefined,
	theater_id: string | undefined, 
	operations: Operations | undefined, 
}
```

##### Response: Status( 200, 400, 404)
```js
MongoDoc: {
	_id: string,
	theater: string,
	operations: [
		{movie_id: number, logistics: {string: number}},
		...
	]
}
or
MovieError: {
	name: string
	message: string
	errorList: any[]
}
```

#### 3. Update Operations - Put movieops:4003/api/v1/operations
##### Description: 
Update the Operations for a movie in a theater

##### Requests:
```js
OperationsRequest: {  
	movie_id: number | undefined;  
	theater_id: string | undefined;  
	operations: Operations | undefined;  
}
```

##### Response: Status( 200, 400, 404)
```js
MongoDoc: {
	_id: string,
	theater: string,
	operations: [
		{movie_id: number, logistics: {string[]: number}},
		...
	],
	...
}
or
MovieError: {
	name: string
	message: string
	errorList: any[]
}
```

#### 4. Get Operations - POST movieops:4002/api/v1/get/operations
##### Description: 
Return the operations for given movie and theater

##### Requests:
```js
OperationsRequest: {  
	movie_id: number | undefined;  
	theater_id: string | undefined;  
}
```

##### Response: Status( 200, 400, 404)
```js
Logistics: {string[]: number}
or
MovieError: {
	name: string
	message: string
	errorList: any[]
}
```

#### 5. Get All Operations - GET movieops:4003/api/v1/operations/all
##### Description:
Get all the data and operations in the database for every theater and movie

##### Requests:
no request data needed

##### Response: Status( 200, 400, 404)
```js
OperationsResponse: MongoDoc[]
or
MovieError: {
	name: string
	message: string
	errorList: any[]
}
```

#### 6. Delete Operations - DELETE movieops:4003/api/v1/operations/
##### Description:
Delete the movie operations for a given theater.

##### Requests:
```js
OperationsRequest: {  
	movie_id: number | undefined;  
	theater_id: string | undefined;  
}
```

##### Response:
```js
MongoDoc: {
	_id: string,
	theater: string,
	operations: [
		{movie_id: number, logistics: {string[]: number}},
		...
	],
	...
}
or
MovieError: {
	name: string
	message: string
	errorList: any[]
}
```


#### 7. Delete Theater - DELETE movieops:4003/api/v1/operations/theater
##### Description
Delete an entire theater from Operations service

##### Request:
```js
OperationsRequest: {  
	theater_id: string | undefined;  
}
```

##### Response:
```js
MongoDoc: {
	_id: string,
	theater: string,
	operations: [
		{movie_id: number, logistics: {string[]: number}},
		...
	],
	...
}
or
MovieError: {
	name: string
	message: string
	errorList: any[]
}
```

### Tutorial
NPM will not work because the microservice looks for the corresponding database to connect too. In order to run the microservice you will need to use docker compose and containerize the microservice and the database. The dockerfile already exists for the microservice and the database is created inside the docker file.

##### Running the Movies Microservice in isolation:
Here is the docker compose file:
```yml
# docker-compose-operations.yml
movie_ops:
	build: ./microservices/movie_ops
	ports:
	- "4003:4003"
	depends_on:
	- mongodb_container
	- eventbus
	environment:
		DATABASE_URL: mongodb://root:rootpassword@mongodb_container:27017/mydb?directConnection=true&authSource=admin

mongodb_container:
	image: mongo:latest
	environment:
		MONGO_INITDB_ROOT_USERNAME: root
		MONGO_INITDB_ROOT_PASSWORD: rootpassword
	volumes:
	- mongodb_data_container:/data/db
	command: --quiet
```

Command
```bash
docker compose -f docker-compose-operations.yml up
```

### Complexity Brownie Points
- Used a variation of MVC Architecture
- Included Validation inside all the endpoints
- Microservice sends out events
- Used Node Router functionality to make code more readable