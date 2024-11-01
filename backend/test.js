// seedUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/user');

// Database connection
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
}).then(() => {
    console.log('Connected to MongoDB');
    seedUser();
}).catch(error => console.log('MongoDB connection error:', error));

// Seed function to create a user
const seedUser = async () => {
    try {
        const email = 'test@gmail.com';
        const plainPassword = 'abc123';

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            mongoose.connection.close();
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Create new user
        const user = new User({
            email,
            password: hashedPassword
        });

        await user.save();
        console.log('User created:', { email });

    } catch (error) {
        console.error('Error seeding user:', error);
    } finally {
        mongoose.connection.close();
    }
};
