//
// ./api/v1/user.routes.v1.js
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
// Vorm van de URL: http://hostname:3000/api/v1/users/23
//
routes.get('/categories/:id', function (req, res) {
    const id = req.params.id
    Category.findById(id)
        .then((category) => {
        res.status(200).json(category);
}).catch((error) => res.status(401).json(error));
});


routes.get('/categories/:id/recipes', function (req, res) {
    const id = req.params.id
    Category.findById(id)
        .then((category) => {
        res.status(200).json(category);
}).catch((error) => res.status(401).json(error));
});

//
// Add a new category
// Vorm van de URL: POST http://hostname:3000/api/v1/users
//
routes.post('/categories', function (req, res) {
    const catBod = req.body;
        Category.create(catBod)
            .then((category) => res.status(201).json(category))
            .catch((error) => res.status(401).json(error));

});

//
// Add a new recipe to a category
// Vorm van de URL: POST http://hostname:3000/api/v1/users
//
routes.post('/categories/:id/recipe', function (req, res) {
    const id = req.params.id;
    var cat = Category.findById(id);
    cat.recipes.create().then(
        (recipe) => {res.status(201).json(category)}
    ).catch((error) => res.status(401).json(error));
});

//
// Update a category
// Er zijn twee manieren om de id van de users mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
//
// Vorm van de URL: PUT http://hostname:3000/api/v1/users/23
//
routes.put('/categories/:id', function (req, res) {
        const id = req.params.id;
        const catBod = req.body;

        Category.findByIdAndUpdate(id, catBod)
            .then((category) => {res.status(202).json(category)})
            .catch((error) => {res.status(401).json(error)});
});

//
// Delete a specific category
// Er zijn twee manieren om de id van de users mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
//
// Vorm van de URL: DELETE http://hostname:3000/api/v1/users/23
//
routes.delete('/categories/:id', function (req, res) {
const id = req.params.id;
Category.findByIdAndRemove(id)
    .then((category)=>{res.status(204).json(category)})
    .catch((error) => {res.status(401).json(error)});
});

//
// Delete a recipe from a category
//
routes.delete('/categories/:id/recipe/:id', function (req, res) {
    const _id = req.params.id;
    const recId = req.params.id;
    var cat = Category.findById(id);
    var rec = Category.recipes.findById(recId);
    cat.recipes.remove(rec).then().catch();


});

//
// Delete all category
//
routes.delete('/categories', function (req, res) {
Category.remove()
    .then((categories)=>{res.status(204).json(categories)})
    .catch((error) => {res.status(401).json(error)});
});

//
// Delete all recipe from category
//
routes.delete('/categories/:id/recipe/', function (req, res) {
const id = req.params.id;
var cat = Category.findById(id);
cat.recipes.remove().then((recipes)=>{res.status(204).json(recipes)})
.catch((error) => {res.status(401).json(error)});



});

module.exports = routes;