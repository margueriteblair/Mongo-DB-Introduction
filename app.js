//imported packages
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const morgan = require('morgan'); //morgan is an http logger middleware, that's what tells us what type of req and to what route it went
const validator = require('validator');

//imported middleware
const firstMid = require('./middleware/firstMiddleware')
const findUser = require('./middleware/findUser')

//setting up 
let app = express();
app.use(express.static('public'))
app.use(express.json())
//app.use(validator); //this allows validator to be used across all pages in the application

//env vars
const port = process.env.PORT || 3000
const URI = process.env.MONGO_DB
// mongo.connect(URI, options, error) where uri is that link to the db and the cluster, options is an object
//error is the third thing and it's optional
//app.use expects a middleware function
if (typeof(URI) === 'string') {
    const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true}
    mongoose.connect(URI, mongoOptions, (error) => {
        if (error) {
            console.error(`\nError Connecting to MongoDB: ${error.message || error} \n`);
        } else {
            console.log('Server connected to DB'); 
        }
    })
} else {
    console.error('Invalid connection to database!');
    
}
//importing routers
const homeRouter = require('./routes/homeRouter')
const userRouter = require('./routes/userRouter')

//middlewares
app.use(morgan('dev')) //the string tells morgan which logged format you would prefer


app.use('/', homeRouter);
app.use('/user', userRouter);


app.listen(port, () => {
    console.log(`Now successfully listening to ${port}.`)
})