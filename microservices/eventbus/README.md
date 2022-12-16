# Eventbus
### Alan Castillo (#59078415) Ilya Pindrus (#56616694) Paul Shi (#55637086)

### Description:
When each microservice boots up, the microservices subscribes to the eventbus by sending the eventbus an endpoint to contact the microservice's event controller. Additionally it sends the eventbus a list of events that it wants to listen for. The eventbus stores this information in a dictionary `{event: endpoints[]}` where it stores the events as keys and the values as a list of subscriber endpoints. Whenever a microservice publishes an event, the event is sent to the eventbus which then forwards the event's data to each of the subscribed endpoints.

### Interactions:
<img src="https://cdn.discordapp.com/attachments/1048309727215497246/1053120762359320647/Screenshot_2022-12-15_at_8.25.48_PM.png" alt="Eventbus Dictionary Example" style="width: 450px; height: 400px; display: block; margin:auto;" />
#### Theater Created Event
1. The theater location service listens for this event. When a theater is created it stores the zip which is needed for locating the theaters.
2. The theater admin listens for this event because it needs to make a new database entry to store future revenue from concessions and tickets.
3. The Movie Operations service listens for this event because it needs to add a new database entry to track any future operations made by the theater, such as when the theater adds a movie and adds showings.

#### Theater Deleted Event
1. The theater location service listens for this event. When a theater is deleted it removes the entry from the theater location database containing that zip.
2. The theater admin listens for this event because when a theater is deleted it removes the entry from the database included all of its revenue date with regards to concessions and tickets.
3. The Movie Operations service listens for this event because when a theater is deleted, it has to remove all the movies and corresponding showing times for that theater.
4. Theater Identity listens for this even, because when a theater is deleted it must remove the corresponding username and password so that an admin cannot log back into the empty account.

#### Payment Created Event
1. Theater admin listens for the payment created event because it needs to know how much money was spent in concessions and/or tickets so that it can update its database.
2. Confirmations needs to listen for the payment event, because whenever a successful payment is made, it has to send a confirmation email to the email provided with the necessary payment information.

#### User Created Event
1. The Theaters microservices listens for the user created event, because it gets all the theater information and then sends back a theater ID.

#### Movie List Updated Event
1. The movie operations microservice listens for the movie list update, so that whenever a movie is added or removed from a theater, the operations are added or removed in the operations microservice.

#### Theater With ID Event
1. Theater Identity listens for the Theater ID event. when a theater is created, the theater ID is given to Theater Identity to connect it to a username and password.

### Tutorial
The eventbus doesn't have an attatched database, so you can run it with `npm start`, however if you want test event communication, you will need to Docker Compose the whole application with `docker compose up`