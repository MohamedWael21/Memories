const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use('/posts', require('./routes/posts'));
app.use('/auth', require('./routes/auth'));

app.use((req, res) => {
    console.log(req.url);
    res.status(404).json({error: "Not Found"});
})

mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
.then(() => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Connected to database and server listen on port ${process.env.SERVER_PORT}`);
    })
})
.catch((error) => {
    console.log(error.message);
})


