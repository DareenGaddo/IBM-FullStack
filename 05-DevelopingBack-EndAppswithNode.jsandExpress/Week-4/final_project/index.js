// Import necessary modules
const express = require('express'); // Import Express framework
const jwt = require('jsonwebtoken'); // Import JSON Web Token for authentication
const session = require('express-session'); // Import Express session for session management

// Import route handlers
const customer_routes = require('./router/auth_users.js').authenticated; // Import customer routes with authentication
const genl_routes = require('./router/general.js').general; // Import general routes

// Create an Express application instance
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to initialize session for routes under "/customer" path
app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

// Middleware for authentication for routes under "/customer/auth/*" path
app.use("/customer/auth/*", function auth(req, res, next) {
    // Middleware which tells that the user is authenticated or not
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken']; // Access Token

        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user;
                next();
            }
            else {
                return res.status(403).json({ message: "User not authenticated" })
            }
        });
    } else {
        return res.status(403).json({ message: "User not logged in" })
    }
});

// Define the port number
const PORT = 5000;

// Mount customer routes under "/customer" path
app.use("/customer", customer_routes);

// Mount general routes under "/" path
app.use("/", genl_routes);

// Start the server and listen on the defined port
app.listen(PORT, () => console.log("Server is running on port", PORT));
