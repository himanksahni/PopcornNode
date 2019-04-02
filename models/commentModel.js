const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/popocorn-2", {useNewUrlParser: true});
const Schema = mongoose.Schema;

const Comment = mongoose.model("Comment", ({

    commentTitle: String,
    commentDescription: String,
    reviewId: { type: Schema.Types.ObjectId, ref: 'Review' },

}));

module.exports = Comment;