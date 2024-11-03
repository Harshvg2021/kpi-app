require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');  // Adjust path as needed

// MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI;

// Category names to insert
const categories = ['Patients', 'Sales', 'Marketing', 'Medical', 'Market Access'];

// Function to connect to the database and add categories
const addCategories = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB.");

        // Iterate over each category and add if it doesn't exist
        for (const name of categories) {
            const existingCategory = await Category.findOne({ name });
            if (!existingCategory) {
                const newCategory = new Category({ name });
                await newCategory.save();
                console.log(`Category '${name}' added.`);
            } else {
                console.log(`Category '${name}' already exists.`);
            }
        }

        console.log("All categories processed.");
    } catch (error) {
        console.error("Error adding categories:", error);
    } finally {
        // Disconnect from the database
        mongoose.disconnect();
    }
};

// Run the function
addCategories();
