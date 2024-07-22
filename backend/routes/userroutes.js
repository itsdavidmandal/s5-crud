// Import the necessary modules
const express = require("express");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// Create a new router object
const router = express.Router();

// Define a POST route handler for creating a new user
router.post("/", async (req, res) => {
    // Destructure the 'name', 'email', and 'age' properties from the request body
    const { name, email, age } = req.body;

    try {
        // Create a new user document and save it to the database
        const userAdded = await User.create({
            name: name, // Assign the 'name' field from the request body to the new document
            email: email, // Assign the 'email' field from the request body to the new document
            age: age // Assign the 'age' field from the request body to the new document
        });

        // Send a successful response with status code 201 (Created) and the newly created user document
        res.status(201).json(userAdded);
    } catch (error) {
        // If an error occurs, send a response with status code 400 (Bad Request) and the error message
        res.status(400).json({ error: error.message });

        // Log the error to the console for debugging purposes
        console.log("An error occurred:", error);
    }
});

// Define a GET route handler for retrieving all users
router.get("/", async (req, res) => {
    try {
        // Find all user documents in the database
        const showAll = await User.find();

        // Send a successful response with status code 201 (Created) and the list of users
        res.status(201).json(showAll);
    } catch (error) {
        // If an error occurs, send a response with status code 400 (Bad Request) and the error message
        res.status(400).json({ error: error.message });
    }
});

// Define a GET route handler for retrieving a single user by ID
router.get("/:id", async (req, res) => {
    // Extract the user ID from the URL parameters
    const { id } = req.params;
    try {
        // Find the user document by ID
        const user = await User.findById(id);
        
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Send a successful response with status code 200 (OK) and the user document
        res.status(200).json(user);
    } catch (error) {
        // If an error occurs, send a response with status code 400 (Bad Request) and the error message
        res.status(400).json({ error: error.message });
    }
});

// Define a DELETE route handler for deleting a user by ID
router.delete("/:id", async (req, res) => {
    // Extract the user ID from the URL parameters
    const { id } = req.params;
    try {
        // Find the user document by ID
        const showAll = await User.findById({ _id: id });

        // Delete the user document by ID
        const deletedUser = await User.findByIdAndDelete(id);

        // Send a successful response with status code 201 (Created) and the list of users
        res.status(201).json(showAll);
    } catch (error) {
        // If an error occurs, send a response with status code 400 (Bad Request) and the error message
        res.status(400).json({ error: error.message });
    }
});

// Define a PATCH route handler for updating a user by ID
router.patch("/:id", async (req, res) => {
    // Extract the user ID from the URL parameters
    const { id } = req.params;

    // Extract the 'name', 'email', and 'age' properties from the request body
    const { name, email, age } = req.body;

    try {
        // Find the user document by ID and update it with the new data
        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new: true // Return the updated document
        });

        // Send a successful response with status code 201 (Created) and the updated user document
        res.status(201).json(updateUser);
    } catch (error) {
        // If an error occurs, send a response with status code 400 (Bad Request) and the error message
        res.status(400).json({ error: error.message });
    }
});

// Export the router to be used in other parts of the application
module.exports = router;
