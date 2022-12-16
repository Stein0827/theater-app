# Front end service

## Team members: 
Alan Castillo (#59078415) Ilya Pindrus (#56616694) Paul Shi (#55637086)

## Description:
The frontend consists of six total pages:

1. admin: The admin page allows the theater admins to edit the details of the theater and the movies that are playing in the theater. The admins can also see their theater's revenue on the admins page.
2. paymentCreate: The paymentCreate page is responsible for clients buying movie tickets and snacks.
3. signin: The signin page allows the theater admins to sign in and manage their theater.
4. signup: The signup page allows a new theater admin to create their account and add their theater.
5. findTheaters: The findTheaters page will find the nearby theaters based on the zip code. 
6. theaterDetail: The theaterDetail will display the selected theater and the movies that are playing. The client can click the purchase button in the theaterDetail page and it'll redirect the user to the paymentCreate page.

## Endpoint&Interactions:

1. The findTheater page interacts with two endpoints: ```http://localhost:4008/api/theaters/locate``` and ```http://localhost:4009/api/v1/theaters```. The first endpoint communicate with the theater locate theater to return a list of theaterIds that is in proximity of the client. The second endpoint then calls to the theater service to get the list of theaters to display.
2. The admin page interacts with multiple endpoints. ```http://localhost:4009/api/v1/theaters``` The admin page calls the theaters endpoint to get the theater that's owned by the theater admin. ```http://localhost:4006/api/revenue``` The admin page calls the theater admin service that returns the revenue of the theater. ```http://localhost:4004/api/v1/movies``` Using the movies field in the theater data object, we pass the movies array to the movies service to get the details of the movies. ```http://localhost:4003/api/v1/get/operations``` We call the movies operation service to help edit the movie details. The page also calls ```http://localhost:4009/api/v1/theater/movies``` to update the movies list in the theater model.
3. The paymentCreate page calls ```http://localhost:4005/api/v1/payment``` to create a new payment using the payment microservice. The newly created payment will then send an event to invoke the confirmation service to send a confirmation email to the client who purchased tickets/snacks.
4. The signin page calls ```http://localhost:4007/api/login```  which originated from the theater identity service. The service will verify the user and grant the user the access to the admins page if the password and username is correct. 
5. The signup page calls ```http://localhost:4007/api/register``` that connects to the theater identity service. The endpoint will then register the new account to the database.
6. The theaterDetail page calls ```http://localhost:4004/api/v1/movies``` to get the list of movies that is contained inside the seleceted theater. The user can then buy tickets through the purchase button. The purchase button will redirect the client to the paymentCreate page.

## Tutorial
In order to run the microservice and the client page conbined, type

```
docker compose up
```

in the root directory of the repository in the terminal.

