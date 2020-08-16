//imported packages
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

//imported middleware
const firstMid = require('./middleware/firstMiddleware')

//setting up 
let app = express();
app.use(express.static('public'))

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


app.use('/', homeRouter);
app.use('/user', userRouter);


app.listen(port, () => {
    console.log(`Now successfully listening to ${port}.`)
})