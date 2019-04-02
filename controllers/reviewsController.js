//root route

const Review = require("../models/reviewModel");

//need this here to show commenents
const Comment = require("../models/commentModel");

module.exports = (app) => {

//get all the reviews on the home page.
// app.get('/', (req, res) => {

//     Review.find().then( (result) => {

//         //console.log("hello")
//         res.render('reviews-index', { reviewsFortemplate: result } );
        

//     }).catch( (err) => {

//         console.log(err.message);

//     })


// });

//go to the create review page from the route

app.get('/movies/:mid/reviews/new', (req, res) => {

    res.render('reviews-new', {title : "Create a new review", movieId: req.params.mid} )


});

//create a review and put it into mongoDB database
app.post("/movies/:mid/reviews/create", (req,res) => {

    //form data is converted into readable express format using bodyparser in app.js
    console.log(req.body);

    Review.create(req.body).then( (result) => {
        
        console.log(result);
        
        res.redirect(`/movies/${result.movieId}`);

    }).catch( (err) => {

        console.log(err);
    })


});

// app.get("/movies/:movieId/reviews/:id", (req, res) => {

//     Review.findById(req.params.id).then( (result) => {

//         Comment.find({reviewId: req.params.id}).then(commentResult => {

//             res.render("review-show", {reviewsFortemplate: result, commentsFortemplate: commentResult} );

//         })

//     }).catch(err => {

//             console.log(err.message);
//     })
// } );

app.get("/reviews/:id/edit", (req, res) => {

    Review.findById(req.params.id).then( (result) => {

        res.render("review-edit", {reviewsFortemplate: result, title: "Edit a review" } );

    } )


} );


app.put("/reviews/:id", (req, res) => {

    Review.findByIdAndUpdate(req.params.id, req.body).then( ( result ) => {

        //didnt change the page have to refresh and submit the form again
        //res.render("review-show", {reviewsFortemplate: result} );
        res.redirect(`/movies/${result.movieId}`)

    } ).catch((err) => {

        console.log(err);
    })

} );


app.delete("/reviews/:id", (req, res) => {

    Review.findByIdAndRemove(req.params.id).then( (result) => {

        console.log("deleted " + result._id);
        res.redirect(`/movies/${result.movieId}`);

    } ).catch( (err) => {

        console.log(err);
    } )


});


}