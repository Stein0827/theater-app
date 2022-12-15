# Movies Microservice
## Alan Castillo (#59078415 - aacastillo)

### Description
The Movies Microservice is responsible for handling all the data for movies. This includes the movie name, description, thumbnail, trailer, rating, and length. It deals with update these attributes, craeting new movies, getting all available movies in the database and getting specific movies based on ID.

### Interactions
The Movies Microservice interacts with the Theaters Microservices and the Movie Operations Microservice. Each theater in the Theater Microservice has a list of movie IDs that the theater is showing. The Theater Microservice, calls the Movie Microservice to get the data of each of the movies. Furthermore, the Movie Operations microservice provides data about the showings time for a specific movie at a specific theater, using movie IDs.

Additionally, whenever a movie is deleted from the database, the movie is also removed from all theaters in the Theater microservice that contains that movie.

### Endpoints
#### 1. Create Movie - POST movies:4004/api/v1/movie
##### Description: 
Add a movie to the Movie Microservice database.
##### Requests:
```js
MovieRequest: {
	movie_id: number | undefined;  
	name: string | undefined;  
	desc: string | undefined;  
	length: string | undefined;  
	rating: string | undefined;  
	thumbnail: string | undefined;  
	trailer: string | undefined;
}
```

##### Response: Status( 200, 400, 404)
```js
MovieResponse: {
	id: number | undefined;
	name: string | undefined;
	desc: string | undefined;
	length: string | undefined;
	rating: string | undefined;
	thumbnail: string | undefined;
	trailer: string | undefined;
}
or
MovieError: {
	name: string
	message: string
	errorList: any[]
}
```

#### 2. Update Movie - PUT movies:4004/api/v1/movie
##### Description: 
Update the movie in the databse when given a valid Id

##### Requests:
```js
MovieRequest: {
	movie_id: number | undefined;  
	name: string | undefined;  
	desc: string | undefined;  
	length: string | undefined;  
	rating: string | undefined;  
	thumbnail: string | undefined;  
	trailer: string | undefined;
}
```

##### Response: Status( 200, 400, 404)
```js
OkPacket: {
	fieldCount: number;
	affectedRows: number;
	changedRows: number;
	insertId: number;
	serverStatus: number;
	warningCount: number;
	message: string;
	procotol41: boolean;
}
or
MovieError: {
	name: string
	message: string
	errorList: any[]
}
```

#### 3. Get Movies (BATCH) - POST movies:4004/api/v1/movies
##### Description: 
Get list of movies by ID

##### Requests:
```js
MovieGetBatchRequest: number[]
```

##### Response: Status( 202, 404)
```js
MovieBatchResponse: (MovieResponse | MovieError) []
```

> Note: Movie Error response looks like the following:
```js
MovieError: {
	name: string
	message: string
	errorList: any[]
}
```

#### 4. Get All Movies - GET movies:4004/api/v1/movies/all
##### Description: 
Return all the movies in the movie database

##### Requests:
No request data is needed

##### Response: Status( 200, 400, 404)
```js
AllMovies: MovieResponse[]
or
MovieError: {
	name: string
	message: string
	errorList: any[]
}
```

#### 5. Delete Movies - POST movies:4004/api/v1/movie
##### Description:
Delete one movie based on valid id

##### Requests:
```js
MovieRequest: {
	movie_id: string
}
```

##### Response: Status( 200, 400, 404)
```js
MovieResponse: "Success: Movie Deleted"
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
# docker-compose-movies.yml
movies:
	build: ./microservices/movies
	ports:
		- "4004:4004"
	depends_on:
		mysql_movies:
			condition: "service_healthy"
	links:
	- "mysql_movies"
	environment:
		MYSQL_URL: mysql_movies
		MYSQL_PORT: 5004
		MYSQL_USER: root
		MYSQL_PASSWORD: password
		MYSQL_DATABASE: db

mysql_movies:
	image: mysql:latest
	environment:
		MYSQL_DATABASE: db
		MYSQL_ROOT_PASSWORD: password # Password for root access
		MYSQL_TCP_PORT: 5004
	ports:
	- '5004:5004' # <Port exposed> : < MySQL Port running inside container>
	expose:
	- '5004' # Opens port 5004 on the container
	volumes: # Where our data will be persisted
	- mysql_movies_data:/data/db
	healthcheck:
		test: ["CMD", "mysqladmin" ,"ping", "-h", "localhost"]
		timeout: 5s
		retries: 4
```

Command
```bash
docker compose -f docker-compose-movies.yml up
```

### Complexity Brownie Points
- Used a variation of MVC Architecture
- Included Validation inside all the endpoints
- Set up MySQL instead of MongoDB, which was not explained in class
- Microservice sends out events
- Used Node Router functionality to make code more readable