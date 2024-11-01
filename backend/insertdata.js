// insertSubjectAreas.js
const mongoose = require('mongoose');
const SubjectArea = require('./models/SubjectArea'); // Adjust the path as necessary
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
    .then(() => {
        console.log('Connected to MongoDB');
        insertSubjectAreas();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

const insertSubjectAreas = async () => {
    const subjectAreas = [
        { name: 'Specialty Pharmacy' }
    ];

    try {
        await SubjectArea.insertMany(subjectAreas);
        console.log('Subject areas inserted successfully');
    } catch (error) {
        console.error('Error inserting subject areas:', error);
    } finally {
        mongoose.connection.close();
    }
};
