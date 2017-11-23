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

// Add a 'dummy' category (every time you require this file!)
const category = new Category({
    name: 'Pizza & Pasta',
    recipes: [{
        name: 'Pepperoni Pizza',
        description: 'A delicious pizza.',
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
        ingredients: [
            {
                name: 'Dough',
                amount: 1
            },
            {
                name: 'Cheese',
                amount: 5
            },
            {
                name: 'Tomato Sauce',
                amount: 1
            }
        ]
    }]
}).save();

module.exports = Category;