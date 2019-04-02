const MovieDb = require('moviedb-promise');
const mDb = new MovieDb('2de3d9f6284b98b3c3f19efa86fd9220')
const Review = require("../models/reviewModel");
const Comment = require("../models/commentModel");

module.exports = (app) => {

    app.get("/", (req, res) => {

        mDb.miscNowPlayingMovies().then( moviesResultFromPromise => {

            res.render('movie-index', {movies: moviesResultFromPromise.results });
        }).catch(err =>
            
            console.log(err.message));


    });

    app.get('/movies/:id', (req, res) => {

        mDb.movieInfo(req.params.id).then( movie => {

            mDb.movieVideos(req.params.id).then( trailer =>{

                Review.find({ movieId: req.params.id }).then( reviews => {

                    
                    res.render('movie', {movieForTemplate : movie, videoForTemplate: trailer.results[0], reviewsFortemplate: reviews});


                }).catch(err => console.log(err.message));

                //res.render('movie', {movieForTemplate : movie, videoForTemplate: trailer.results[0]});

            }).catch(errTrailer => console.log(errTrailer.message))

        }).catch(err => {

            console.log(err.message);
        })

    })



    // app.get("/movies/:movieId/reviews/:id", (req, res) => {

    //     Review.findById(req.params.id).then( (result) => {
    
    //         Comment.find({reviewId: req.params.id}).then(commentResult => {
    
    //             res.render("review-show", {reviewsFortemplate: result, commentsFortemplate: commentResult} );
    
    //         })
    
    //     }).catch(err => {
    
    //             console.log(err.message);
    //     })
    // } );


app.get("/movies/:movieId/reviews/:id", (req, res) => {

        Review.findById(req.params.id).then( (result) => {
    
            Comment.find({reviewId: req.params.id}).then(commentResult => {
    
                res.render("review-show", {reviewsFortemplate: result, commentsFortemplate: commentResult} );
    
            })
    
        }).catch(err => {
    
                console.log(err.message);
        })
    } );


}