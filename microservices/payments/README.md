# Payments Microservice
## Alan Castillo (#59078415 - aacastillo)

### Description
The Payments microservice is respobsible for handling the data needed to make payments. This includes credit card information, billing information, email, and costs.

### Interactions
The Payments service interacts with the Theater Admin Microservice and the Confirmations Service. The Payments Service sends payment information data, like how much was spent on tickets and concessions. It interacts with confirmations by sending an event saying a payment was created, so that the Confirmations Service can send a confirmation email.

### Endpoints
#### 1. Create Payment - POST payments:4005/api/v1/payment
##### Description: 
Add a payment to the Payment Microservice database.

##### Requests:
```js
PaymentRequest: {
	payment_id: number | undefined;
	movie_id: number | undefined;
	theater_id: string | undefined;
	date: Date | undefined;
	showing: string | undefined;
	concessions: number | undefined;
	tickets: number | undefined;
	email: string | undefined;
	fname: string | undefined;
	lname: string | undefined;
	cardnum: string | undefined;
	seccode: string | undefined;
	cardexp: string | undefined;
	bstreet: string | undefined;
	bunit: string | undefined;
	bstate: string | undefined;
	bcountry: string | undefined;
	zip: string | undefined;
}
```

##### Response: Status( 200, 400, 404)
```js
MovieResponse: {
	payment_id: number | undefined;
	movie_id: number | undefined;
	theater_id: string | undefined;
	date: Date | undefined;
	showing: string | undefined;
	concessions: number | undefined;
	tickets: number | undefined;
	email: string | undefined;
	fname: string | undefined;
	lname: string | undefined;
	cardnum: string | undefined;
	seccode: string | undefined;
	cardexp: string | undefined;
	bstreet: string | undefined;
	bunit: string | undefined;
	bstate: string | undefined;
	bcountry: string | undefined;
	zip: string | undefined;
}
or
PaymentError: {
	name: string
	message: string
	errorList: any[]
}
```

#### 2. Get All Payment - GET payments:4005/api/v1/payment
##### Description: 
Gets all the payment data in the database

##### Requests:
Takes no request data

##### Response: Status( 200, 400, 404)
```js
Response: PaymentResponse[]
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
payments:
	build: ./microservices/payments
	ports:
		- "4005:4005"
	depends_on:
		mysql_payments:
			condition: "service_healthy"
	links:
	- "mysql_payments"
	environment:
		MYSQL_URL: mysql_movies
		MYSQL_PORT: 5005
		MYSQL_USER: root
		MYSQL_PASSWORD: password
		MYSQL_DATABASE: db

mysql_payments:
	image: mysql:latest
	environment:
		MYSQL_DATABASE: db
		MYSQL_ROOT_PASSWORD: password # Password for root access
		MYSQL_TCP_PORT: 5005
	ports:
	- '5005:5005' # <Port exposed> : < MySQL Port running inside container>
	expose:
	- '5005' # Opens port 5004 on the container
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
- Microservice sends out events
- Used Node Router functionality to make code more readable