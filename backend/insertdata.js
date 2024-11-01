// insertKPI.js

const mongoose = require('mongoose');
const KPI = require('./models/KPI'); // Adjust path as necessary
require('dotenv').config(); // Ensure you have your MongoDB URI in .env file

// MongoDB connection
const mongoUri = process.env.MONGODB_URI; // Replace with your MongoDB URI if not using .env file
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Data to insert
const kpiData = {
    therapy_area: "Rare Disease",
    region: "US",
    distribution_model: "Specialty Pharmacy",
    subject_area: "Pharmacy",
    KPI_list: [
        { name: "Active Patients", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { name: "Total Enrollments", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { name: "At Risk Patients", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { name: "Discontinued Patients", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { name: "Avg Time to Fill", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { name: "Total Enrolling HCP", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { name: "Total Units", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { name: "Total Writers", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { name: "Total Targets", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { name: "Refill Risk", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { name: "Pending Patients", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
    ]
};

// Insert data
const insertData = async () => {
    try {
        const kpiEntry = new KPI(kpiData);
        await kpiEntry.save();
        console.log('KPI entry inserted successfully');
    } catch (error) {
        console.error('Error inserting KPI entry:', error);
    } finally {
        mongoose.connection.close();
    }
};

insertData();
