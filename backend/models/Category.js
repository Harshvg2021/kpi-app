const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true  
    },
    description: {
        type: String,
        default : "not provided"
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);