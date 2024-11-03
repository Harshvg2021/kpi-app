const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const TherapyArea = require('../models/TherapyArea'); 
require('dotenv').config()


const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

async function insertTherapyAreas() {
    const therapyAreas = [];

    fs.createReadStream(path.join(__dirname, 'therapy_area.csv'))
        .pipe(csv())
        .on('data', (row) => {
            const name = row['Therapy Area'];
            therapyAreas.push({ name });
        })
        .on('end', async () => {
            console.log('CSV file successfully processed. Inserting data...');
            try {
                await TherapyArea.insertMany(therapyAreas);
                console.log('Therapy Areas inserted successfully');
            } catch (error) {
                console.error('Error inserting therapy areas:', error);
            } finally {
                mongoose.connection.close();
            }
        });
}

insertTherapyAreas();
