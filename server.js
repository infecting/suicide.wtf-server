const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const pdfRenderer = require('@ministryofjustice/express-template-to-pdf')
require('dotenv').config();
const app = express()
app.use(pdfRenderer())
app.use(
    cors({
        credentials: true,
        origin: process.env.ORIGIN
    })
);
app.use(express.json());
app.set("trust proxy", 1);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
PORT = process.env.PORT || 5000
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
const giftcardRouter = require('./routes/giftcard')
app.use('/v1', giftcardRouter)
//docker
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})