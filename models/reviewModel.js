//Mongooese is an ODM
//helps in making JS objects into JSON for mongoDB

const mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema( {

    title: String,
    movieTitle: String,
    description: String,
    movieId: {type: String, required: true}


}, {timestamps: true} );

//Conects to the database popcorn-2
mongoose.connect("mongodb://localhost/popcorn-2", {useNewUrlParser: true});

//making model schma with mongoose

const Review = mongoose.model("Review",reviewSchema);


//update a reviews

module.exports = Review;