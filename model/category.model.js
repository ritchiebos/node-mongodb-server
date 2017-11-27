const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    recipes: [{
        name: String,
        description: String,
        imagePath: String,
        ingredients: [{
            name: String,
            amount: Number
        }]
    }]
}, {
    timestamps: true
});


const Category = mongoose.model('category', CategorySchema);

module.exports = Category;