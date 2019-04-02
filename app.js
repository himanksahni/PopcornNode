
//Importing express
const express =require("express");
const app = express();

//template engine for express
const hb = require("express-handlebars");

/*
    $ npm install body-parser --save
    Body Parser is a module that allows express to see form data that is coming in from a POST request.
    body-parser gives us a new attribute of the req object called req.body and this will contain the 
    form data. So when you submit your form you should see it log in in your terminal like this:

    { title: 'Creating a Review',
       description: 'a sample review description' }
*/

const bodyparser = require("body-parser");

//using method-overide middleware to intercept post as put or delete

const methodOverride = require('method-override');
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))



app.use(bodyparser.urlencoded( { extended: true } ));


app.listen(3000, () => {
    console.log('App listening on port 3000!')
  });

app.engine('handlebars', hb({ defaultLayout: 'main' }));

//by default it is views
app.set('views', './views');
app.set('view engine', 'handlebars');

//all the things in reviewscontroller.js are now included in this file
const reviewController = require("./controllers/reviewsController")(app);

const commentController = require("./controllers/commentcontroller")(app);
const movieController = require("./controllers/movieController")(app);




