//
// ./api/v1/category.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Category = require('../model/category.model');

//
// Return a list of recipe categories
//
routes.get('/categories', function (req, res) {
    res.contentType('application/json');

    Category.find({})
        .then((categories) => {
        res.status(200).json(categories);
}).catch((error) => {
        res.status(400).json(error);
});
});

//
// Return a category with all the recipes
//
routes.get('/categories/:id', function (req, res) {
    const id = req.params.id
    Category.findById(id)
        .then((category) => {
        res.status(200).json(category);
}).catch((error) => res.status(401).json(error));
});

//
// Add a new category
//
routes.post('/categories', function (req, res) {
    const catBod = req.body;
    const cat =  new Category({
        name: catBod.name,
        recipes: catBod.recipes
    });

    cat.save().then((category) => {res.send(category)}).catch((error) => {res.status(401).json(error)});

});

//
// Update a category
//
//
routes.put('/categories/:id', function (req, res) {

    const catBod = req.body;
    const cat =  new Category({
        name: catBod.name,
        recipes: catBod.recipes
    });

    cat.save().then((category) => {res.send(category)}).catch((error) => {res.status(401).json(error)});

});

//
// Delete a specific category
//
routes.delete('/categories/:id', function (req, res) {
const id = req.params.id;
Category.findByIdAndRemove(id)
    .then((category)=>{res.status(204).json(category)})
    .catch((error) => {res.status(401).json(error)});
});

//
// Delete all category
//
routes.delete('/categories', function (req, res) {
Category.remove()
    .then((categories)=>{res.status(204).json(categories)})
    .catch((error) => {res.status(401).json(error)});
});


module.exports = routes;