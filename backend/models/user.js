
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    customKPIs: {
        type: [{
            therapy_area: String,
            region: String,
            distribution_model: String,
            subject_area: String,
            KPIs: [
                {
                    name: String,
                    description: String
                }
            ]
        }],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
