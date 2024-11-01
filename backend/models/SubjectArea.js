const mongoose = require('mongoose');

const subjectAreaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('SubjectArea', subjectAreaSchema);
