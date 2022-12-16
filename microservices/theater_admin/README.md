# Theater Admin Microservice
## Ilya Pindrus (#56616694 - ilya-pindrus) 

### Description
The Theater Admin service allows an admin user to manage their theater. The theater admin is able to add and delete both the movies that are playing at the theater as well as the times each is playing. Additionally, the admin is able to view the total revenue from ticket and concession sales. The theater admin's database contains the total ticket revenue and concession revenue for each day that the theater has been open. The service exceeds expectations because utilizes the MVC architecture which assists with better isolation of responsibilities and mimics the design of a professional code base.

### Interactions
The Theater Admin service interacts with the Theater and Payment Service. When a theater gets created/deleted, the Theater Admin adds/deletes the theaterId to/from its database. When a payment is made, the payment service sends a paymentCreated event contain the ticket revenue and concession revenue for the purchase. The theater admin uses that data to either add to the current days total or creates a new entry for a new day. 

### Endpoints
#### 1. Get Sales Revenue - POST theater_admin:4006/api/revenue
##### Description: 
Gets the entire revenue for each day the theater has been open and the total ticket and concession for the lifetime of the theater. 
##### Requests:
```js
SalesRequest {
    theaterId: string
}
```

##### Response: Status(200, 400, 404)
```js
SalesResponse: {
    totalTicketRevenue: number,
    totalConcessionRevenue: number,
    totalRevenue: {
        ticketRevenue: number, concessionRevenue: number, date: Date
    }[]
}
or
AdminError: {
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
# docker-compose-theater-admin.yml
theater_admin:
    build: ./microservices/theater_admin
    ports:
      - "4006:4006"
    depends_on:
      - mongodb_container
    environment:
      DATABASE_URL: mongodb://root:rootpassword@mongodb_container:27017/mydb?directConnection=true&authSource=admin

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
docker compose -f docker-compose-theater-admin.yml up
```
