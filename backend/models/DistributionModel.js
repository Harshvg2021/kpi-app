import mongoose from 'mongoose';

const distributionModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const DistributionModel = mongoose.model('DistributionModel', distributionModelSchema);

export default DistributionModel;
