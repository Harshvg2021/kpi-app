const mongoose = require('mongoose');

const distributionModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('DistributionModel', distributionModelSchema);
