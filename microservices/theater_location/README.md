# Theater Location Microservice
## Ilya Pindrus (#56616694 - ilya-pindrus) 

### Description
The Theater Location Service functions as a cache when locating theaters within a specified zipcode. When a query for locale theaters is made, the service returns all the theaterIds within a specified radius. The Theater Location service is also responsible for updating the database when theaters are created and deleted to always hold up to date information. 

### Interactions
The Theater Location service interacts with the Theater Service. The Theater Location's database is updated when the Theater service sends an event indicating that a theater was either created or deleted.  

### Endpoints
#### 1. Get Local Theaters - POST theater_location:4008/api/theaters/locate
##### Description: 
Get all the theaters with a set radius of a zipcode
##### Requests:
```js
MovieLocationRequest {
    zipcode: string
}
```

##### Response: Status(200, 400, 404)
```js
MovieResponse: {
	theaterId[]: string[]
}
or
TheaterLocationError: {
	name: string
	message: string
	errorList: any[]
}
```

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