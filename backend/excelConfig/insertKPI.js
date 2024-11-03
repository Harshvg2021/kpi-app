const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const KPI = require('../models/KPI'); 
require('dotenv').config()

// MongoDB connection URI
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

async function insertKPIs() {
    const kpiData = [];
    fs.createReadStream(path.join(__dirname, 'KPI_details.csv'))
        .pipe(csv())
        .on('data', (row) => {
            const {
                Region,
                'Therapy Area': therapy_area,
                'Distribution Model': distribution_model,
                'Subject Area': subject_area,
                Category: category,
                KPI: name,
                Definition: description
            } = row;

            const trimmedRegion = Region.trim();
            const trimmedTherapyArea = therapy_area.trim();
            const trimmedDistributionModel = distribution_model.trim();
            const trimmedSubjectArea = subject_area.trim();
            const trimmedCategory = category.trim();
            const trimmedName = name.trim();
            const trimmedDescription = description.trim();

            let kpiEntry = kpiData.find(kpi =>
                kpi.region === trimmedRegion &&
                kpi.therapy_area === trimmedTherapyArea &&
                kpi.distribution_model === trimmedDistributionModel &&
                kpi.subject_area === trimmedSubjectArea
            );

            if (!kpiEntry) {
                kpiEntry = {
                    therapy_area: trimmedTherapyArea,
                    region: trimmedRegion,
                    distribution_model: trimmedDistributionModel,
                    subject_area: trimmedSubjectArea,
                    KPI_list: []
                };
                kpiData.push(kpiEntry);
            }

            kpiEntry.KPI_list.push({
                name: trimmedName,
                description: trimmedDescription,
                category: trimmedCategory
            });
        })
        .on('end', async () => {
            console.log('CSV file successfully processed. Inserting data...');
            try {
                await KPI.insertMany(kpiData);
                console.log('KPI data inserted successfully');
            } catch (error) {
                console.error('Error inserting KPI data:', error);
            } finally {
                mongoose.connection.close();
            }
        });
}

insertKPIs();
