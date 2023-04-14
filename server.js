const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config();
const app = express()
app.use(
    cors({
        credentials: true,
        origin: process.env.ORIGIN
    })
);
app.use(express.json());
app.set("trust proxy", 1);
PORT = process.env.PORT || 5002;
let uri = process.env.ATLAS_URI || process.env.MONGO_URL
mongoose.connect(uri, { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo Connection established!")
})

const linkRouter = require('./routes/link')
app.use('/v1', linkRouter)
const binsRouter = require('./routes/bin')
app.use('/v1', binsRouter)
const archiveRouter = require('./routes/archive')
app.use('/v1', archiveRouter)
const pxRouter = require('./routes/px')
app.use('/v1', pxRouter)
//docker
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
