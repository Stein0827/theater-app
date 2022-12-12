# Controller Folder
Focuses on 
# Microservice Ports
- 4000: eventbust
- 4001: concessions
- 4002: confirmations
- 4003: movie_ops
- 4004: movies
- 4005: payments
- 4006: theater-admin
- 4007: theater-identity
- 4008: theater-location
- 4009: theaters

# DB Ports
- 5001: concessions
- 5002: confirmations
- 5003: movie-ops
- 5004: movies
- 5005: payments
- 5006: theater-admin
- 5007: theater-identity
- 5008: theater-location
- 5009: theaters

# Notes on TypeScript and Modules!
Make sure that when you import a local file into your current working file use the `.js` extension. TS wont complain if you don't but it will not
compile correctly if you dont. Also make sure that you have `es6` as the value for your `module` key in `tsconfig.json`. Following
these steps makes sure that we are using es6 modules and not commonjs modules.
# Microservice Directory Structure
## Routes
The routes will be responsible for routing HTTP request to the controllers that handle business logic
# Controller
Controllers validate the request and provide the response back to the router/ HTTP layer. They call the Model layer and sometimes
the Data layer to handle requests and logic.

# Model
This directory is focused on creating a object model of the microservice data, this is helpful for understanding the data and is responsible
for making data layer calls.
# Data
This layer is focused on connecting to the database, initiating data, and querying the database.