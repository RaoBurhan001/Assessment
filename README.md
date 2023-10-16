
Table of Contents

Steps to run the project

Backend Development

Database Setup

Database Models

Database Configuration

Database Seeder

RESTful API Endpoints

Frontend Development

Design and UI Framework

Integration with API

Signup Page

Users List Page

Backend Development

Database Setup

We use MongoDB for this project. You can install MongoDB and set up a local database. Make sure the MongoDB server is running. You can install MongoDB from here.

clone the repository

Backend
npm init
npm install 
npm run dev

Frontend
create a vite app ( based on your preference  (https://vitejs.dev/guide/))
npm install
npm run dev

Database Models
User Model
Country Model
City Model
State Model

username
email
country
state (foreign key)
city (foreign key)
country (foreign key)

Country Model
name

State Model
name 
country (foreign key)

City Model

name
state (foreign key)


Database Configuration
We need to configure the backend application to connect to the MongoDB database. Make sure you have Node.js installed. Here is an example of how to set up the database connection using Mongoose:
Change your db key in the .env.file and also update your jwt secret

javascript
// Import Mongoose
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost/usermanagementdb', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Handle database connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
Database Seeder

run the following script to populate your database
npm run seed:active

RESTful API Endpoints
Login Endpoint (POST)

URL: /api/login
Body: username, password
Purpose: Log in a user. Authenticate user credentials.
Signup Endpoint (POST)

URL: /api/signup
Body: username, email, country, state, city
Purpose: Create a new user.
User List Endpoint (GET)

URL: /api/users
Query Parameters: page, limit, orderby, search
Purpose: Get a paginated, sorted, and filtered list of users.
User Update Endpoint (PUT)

URL: /api/users/:id
Params: id
Body: username, email, country, state, city
Purpose: Update user information by their ID.
User Delete Endpoint (DELETE)

URL: /api/users/:id
Params: id
Purpose: Delete a user by their ID.

URL: /api/common/getAllCountries
Params: {}
Purpose: get all countries.

URL: /api/common/getStatesByCountryId
Params: countryId
Purpose: get all states of a specific country.

URL: /api/common/getCitiesByStateId
Params: stateId
Purpose: get all cities of a specific state.


Frontend Development
Design and UI Framework
For the frontend, we've used Material UI 
We have added the following routing 

Routing
To ensure a smooth and intuitive user experience, we've implemented the following routing within our application:
If you get an empty page while starting the Frontend application go to the /signup or /login.

/signup: This route allows users to sign up for an account.
/login: Users can log in to their accounts using this route.
/listing: The user listing page displays a table with a list of users.
/editUser: This route enables users to edit their user information.

Integration with Backend
To establish a connection between the frontend and the backend, we've implemented several key features:

Axios Interceptors: We've incorporated Axios interceptors to streamline communication with the backend. 
These interceptors handle requests and responses, making it easier to manage authentication, error handling, and other cross-cutting concerns.

Token Management: To maintain user authentication and secure API requests, we've leveraged local storage to store authentication tokens.
This ensures that users remain authenticated across different parts of the application.

Generic Response and Error Handling: We've implemented a generic response and error handler. This handler efficiently manages responses from the backend 
and ensures that errors are gracefully presented to the user.

Form Validation
For validating user inputs in forms, we've employed Yup. Yup is a robust and flexible JavaScript schema validation library. 
It enables us to define validation rules and ensure that user-provided data adheres to our specified criteria.

Form Submission
We've implemented form submission using React Hook Form. This library offers a simplified and efficient way to manage and validate form data within our application.

User Listing
The React Table library is used to render the user listing. This table offers valuable features, such as pagination, sorting, and filtering.
It ensures that users can easily navigate and explore the list of users. Additionally, query parameters are set when paginating, sorting, or filtering.
This means that user preferences are maintained, even if the page is refreshed.

