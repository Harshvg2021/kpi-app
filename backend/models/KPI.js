const mongoose = require('mongoose');

const kpiSchema = new mongoose.Schema({
    therapy_area: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    distribution_model: {
        type: String,
        required: true
    },
    subject_area: {
        type: String,
        required: true
    },
    KPI_list: {
        type: [String],  
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('KPI', kpiSchema);
