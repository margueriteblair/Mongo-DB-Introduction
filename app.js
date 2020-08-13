//imported packages
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
//setting up 
let app = express();
const port = process.env.PORT || 3000
const URI = process.env.MONGO_DB
if (typeof(URI) === 'string') {
    const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true}
    mongoose.connect(URI, mongoOptions, (error) => {
        if (error) {
            console.error(`\nError Connecting to MongoDB: ${error.message || err} \n`);
        } else {
            console.log('Server connected to DB');
            
        }
    })
} else {
    console.error('Invalid connection to database!');
    
}
//importing routers
const homeRouter = require('./routes/homeRouter')
const schema = new mongoose.Schema({

});

app.use('/', homeRouter);


app.listen(port, () => {
    console.log(`Now successfully listening to ${port}.`)
})