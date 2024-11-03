const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const SubjectArea = require('../models/SubjectArea');  
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family : 4
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

async function insertSubjectAreas() {
    const subjectAreas = [];

    fs.createReadStream(path.join(__dirname, 'subject_area.csv'))
        .pipe(csv())
        .on('data', (row) => {
            const name = row['Subject Areas'];
            subjectAreas.push({ name });
        })
        .on('end', async () => {
            console.log('CSV file successfully processed. Inserting data...');
            try {
                await SubjectArea.insertMany(subjectAreas);
                console.log('Subject Areas inserted successfully');
            } catch (error) {
                console.error('Error inserting subject areas:', error);
            } finally {
                mongoose.connection.close();
            }
        });
}

insertSubjectAreas();
