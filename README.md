# movie-app
a website built using react, spring boot and the TMDB API


# Authors
Sameer Jbara 
Anton Nahhas 


# Initializing the template

In order to initialize the project make sure to:

1. When you open the project, if intelliJ propose to "Load Maven Project" do it. You can later reload maven with the "M" icon on the right of the screen, or by right clicking on the pom.xml file and selecting "Maven -> Reload project".
2. You see red lines in the code? Go to File -> Project Structure -> Project Settings -> Project -> SDK -> and choose your Java SDK
3. Still see red stuff? Open the same dialog and click on "Fix" if you see some

Everything ok?
1. Run the SQL server and create a database named "ex4". The DB credentials are stored in the application.properties file. You may change them if you want.
2. Run the project, you should not see any errors in IntelliJ console


## Initializing the React client (movie-app)

Open a terminal in *movie-app* and run `npm install` and then `npm start`. You should see the client running on http://localhost:3000.
You can also open another instance of IntelliJ and open the *movie-app* folder as a project. You can then run the client from there.

## Frontend
# Overview
The frontend of the movie application is built using React, offering a seamless interface for users to search for movies, view movie details, add them to the cart, and manage the checkout process. The application integrates with a backend service, enabling dynamic content rendering and user interactions.

# Features & Components:
1. CartItems.js

Displays the list of movies added to the cart.
Offers options to clear the entire cart or remove specific movies.

2. EmptyCart.js

Displays an informative message when the cart is empty.
Features a GIF for enhanced user engagement.

3. PaymentDetails.js

Presents a breakdown of the total payment details.

4. PaymentForm.js

Renders a form for users to input payment details with built-in validation.

5. TotalPayment.js

Showcases the final payment amount to the user during checkout.

6. ByDiscover.js

Enables users to discover movies with a simple button click.

7. ByGenre.js

Provides a dropdown menu for users to search for movies by genre.

8. ByPopular.js

A component that fetches and displays popular movies.

9. ErrorMessages.js

Displays error messages to the user, enhancing transparency and feedback during interactions.

10. SearchResult.js

Displays the movies returned from user searches.
Provides interactive features such as adding movies to the cart.

# Technologies & Libraries:

React: The primary library used for building the user interface components.
React Router: Enables navigation between different components, simulating the feel of navigating through different pages.
UUID: Used for generating unique identifiers, ensuring that elements like movies in the cart have unique keys.
useState & useEffect Hooks: Essential React hooks that facilitate state management and side effects in functional components.
JSX: Used to define the component layouts, allowing for a declarative syntax that closely resembles HTML.

## Backend

# Overview
The backend of the movie application is structured using the Spring Boot framework, providing a robust and scalable solution for movie cart management and purchase functionalities. It integrates with a relational database using the JPA (Java Persistence API) to store and manage purchase records.

# Features & Components
1. Entities:

Movie: Represents a movie with attributes like title, overview, backdrop path, and price.
Purchase: Represents a record of a user buying a product. It captures details like first name, last name, email, and payment amount.

2. Controllers:

- CartController: Manages the API endpoints related to the cart operations. Provides functionalities like adding movies to the cart and removing movies from the cart.
- DebugController: (For debugging purposes) Allows checking the database contents and testing the code.

3. Configuration & Session Management:

DemoApplication: The main Spring Boot application class that bootstraps the application.
SessionHandler: Configures session-related functionalities, such as session listeners and session ID resolvers.

4. Repository:

PurchaseRepository: Interface for the Purchase entity repository, providing methods to interact with the underlying database.


# Technologies & Libraries
Spring Boot: Used as the primary framework for developing the backend services.
JPA (Java Persistence API): Provides an abstraction layer to interact with the database.
Jakarta Annotations: Used for defining entities, validation constraints, and servlet functionalities.
Spring's Dependency Injection: Allows easy instantiation and management of beans, as evidenced by the @Autowired and @Component annotations.
RESTful Web Services: The backend exposes RESTful endpoints for the frontend to consume.


