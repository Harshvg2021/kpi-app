const mongoose = require('mongoose');
const dotenv = require('dotenv');
const KPI = require('./models/KPI'); // Adjust the path as necessary

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Data to insert
const kpiData = {
    therapy_area: "Rare disease",
    region: "US",
    distribution_model: "Specialty pharmacy",
    subject_area: "Pharmacy",
    KPI_list: [
        "Active Patients",
        "Total Enrollments",
        "At Risk Patients",
        "Discontinued Patients",
        "Avg Time to Fill",
        "Total Enrolling HCP",
        "Total Units",
        "Total Writers",
        "Total Targets",
        "Refill Risk",
        "Pending Patients"
    ]
};

// Insert data into the KPI model
const insertKPI = async () => {
    try {
        const newKPI = new KPI(kpiData);
        const savedKPI = await newKPI.save();
        console.log('KPI entry created:', savedKPI);
    } catch (error) {
        console.error('Error inserting KPI:', error);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
};

// Execute the insert function
insertKPI();
