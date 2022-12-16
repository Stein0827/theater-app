# Theater Location Microservice
## Ilya Pindrus (#56616694 - ilya-pindrus) 

### Description
The Theater Identity Service is responsible for handling the admin registration. It handles the registration, login, and deletion of theater admin user accounts. The services stores the username, a hashed password, and the associated theater id that the theater admin manages. The portion of the service which exceeds expectations is that when a user either logs in or registers, a cookie gets set which creates a session for 1 hour. All admin API requests are first validated to check that the admin is the one making the request before being executed. 

### Interactions
The Theater Location service interacts with the Theater Service. When a theater admin creates an account, it sends a userCreated event to the Theater service in order for it to make an account. The theater service then responds with a theaterId event in order for the theater identity service to add the theaterId for the newly created user. 

### Endpoints
#### 1. Login User - POST theater_identity:4007/api/theaters/locate
##### Description: 
Validates a user when they login in
##### Requests:
```js
LoginRequest {
    username: string,
    password: string
}
```

##### Response: Status(200, 400, 404)
```js
LoginResponse: {
    theaterId: string,
}
or
LoginError: {
	name: string
	message: string
	errorList: any[]
}
```
#### 2. Register User - POST theater_identity:4007/api/register
##### Description: 




### Tutorial
NPM will not work because the microservice looks for the corresponding database to connect too. In order to run the microservice you will need to use docker compose and containerize the microservice and the database. The dockerfile already exists for the microservice and the database is created inside the docker file.

##### Running the Theater Location Microservice in isolation:
Here is the docker compose file:
```yml
# docker-compose-theater-location.yml
theater_location:
    build: ./microservices/theater_location
    ports:
      - "4008:4008"
    depends_on:
      - mongodb_container
    environment:
      DATABASE_URL: mongodb://root:rootpassword@mongodb_container:27017/mydb?directConnection=true&authSource=admin
      ZIPCODE_PROXIMITY: "75"

mongodb_container:
    image: mongo:latest
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: rootpassword
    volumes:
      - mongodb_data_container:/data/db
    command: mongod --quiet --logpath /dev/null 

```

Command
```bash
docker compose -f docker-compose-theater-location.yml up
```

