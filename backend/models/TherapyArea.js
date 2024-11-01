const mongoose = require('mongoose');

const therapyAreaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('TherapyArea', therapyAreaSchema);
