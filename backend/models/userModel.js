// Import the mongoose library
const mongoose = require("mongoose");

// Define a schema for the User model
const userSchema = new mongoose.Schema({
    // Define a 'name' field with type String, which is required
    name: {
        type: String,
        required: true
    },
    // Define an 'email' field with type String, which must be unique and is required
    email: {
        type: String,
        unique: true,
        required: true
    },
    // Define an 'age' field with type Number, which is optional
    age: {
        type: Number
    }
});

// Create a User model using the defined schema
const User = mongoose.model("User", userSchema);

// Export the User model to be used in other parts of the application
module.exports = User;
