const Comment = require("../models/commentModel");

module.exports = (app) => {

    app.post("/reviews/comment", (req,res) => {
        //console.log("reqbody: " + req.body);
        Comment.create(req.body).then( result => {
            console.log("comment: " + result);
            res.redirect(`/reviews/${result.reviewId}`);

        }).catch(err => {

            console.log(err);
        })

    } )

    app.delete('/reviews/comments/:id', (req, res) =>{


        Comment.findByIdAndRemove(req.params.id).then(result => {

            res.redirect(`/reviews/${result.reviewId}`);
        }).catch(err => {

            console.log(err.message);
        })
    })



}