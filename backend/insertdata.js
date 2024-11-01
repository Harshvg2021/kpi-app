const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Adjust the path as needed
require('dotenv').config();
// Connect to your MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family :4
})
.then(async () => {
    const email = 'test@gmail.com';
    const password = 'abc123';

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
        email: email,
        password: hashedPassword,
        customKPIs: [] // Initialize with empty KPIs
    });

    // Save the new user to the database
    await newUser.save();
    console.log('New user created:', newUser);
})
.catch(err => {
    console.error('Error connecting to the database or saving the user:', err);
})
.finally(() => {
    mongoose.connection.close();
});
