const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000 ;
const URL = 'mongodb://localhost:27017/instadb';


mongoose.connect(URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

mongoose.connection.on('connected', () => {
    console.log('Successfully connected to InstaDB')
});
mongoose.connection.on('error', (err) => {
    console.log('error while connecting to InstaDB : ',err)
});

require('./models/user');

app.use(express.json());
app.use(require('./routes/auth'));

app.listen(PORT,() =>{
    console.log("Server is running under port 5000 ...")
})