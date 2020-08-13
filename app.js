const express = require('express');
const mongoose = require('mongoose');


const heroRouter = require('./routes/heroes');
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth');

const app = express();
const port = process.env.port || 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/heroes', heroRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

mongoose.connect("mongodb+srv://user:user%40123@cluster0-ytx8s.mongodb.net/herodb?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Database Connection Established.!")
}).catch(error => {
    console.log('Error: '+error);
});


app.get('/', (req, res) =>{
    res.send('Avengers Assembled.!');
});


app.listen(port, () => {
   console.log('Listing on port: ', port); 
});
