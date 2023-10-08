'use strict';
require('dotenv').config();
const express = require('express')
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const surveyRoute = require('./routes/surveyRoute');
const { httpError } = require('./utils/errors');
const passport = require('./utils/pass');
const app = express()
const port = 3000

app.use(cors());
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRoute);
app.use('/user', passport.authenticate('jwt', { session: false }), userRoute);
app.use('/survey', passport.authenticate('jwt', {session: false}), surveyRoute);

app.use((req, res, next)=>{
    const err = httpError('Not found', 404);
    next(err);
});
  
app.use((err, req, res, next) => {
    const statusCode = err.status || 400;
    res.status(statusCode).json({ message: err.message, status: statusCode });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})