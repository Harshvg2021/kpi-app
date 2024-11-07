import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true  
    },
    description: {
        type: String,
        default: "not provided"
    }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

export default Category;
