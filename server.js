const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config();
const app = express()
app.use(
    cors()
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post("/api/v2/collector", (req, res) => {
    if (req.body.seq == 0) {
        res.json({do: [
            "bake|_px3|330|a56d14e569e89cff68af14a8cf2bdd5927a27e0172ee2842f5ee3fdb0a5224f5:s6T4JtoDAiou8dD3QVV6P+a7UkNRA8UTC77GtJo60CyZmLtUXN1G51irS5vGHPzQX5F/hpWtaxV795QxfhD2BA==:1000:wN6kTPCst7S4iYlgDO29/36tJARonwhHA9h7QrQX4hGaQTqbje+8JzlwCVBDxve0HPcjeWRG21iUYMURkjL87IqXke+geXbRR1/Xz0LrI0YiVnZS9dU9UYDRme9HSyksbnTwKJPAa6DV8/YqI3CzjShYEsXfowTP09mHjSHay6b8z2QzddK2yRrJKJ2Ae8wDuIN38S4eXEyDI3K+vhpUkA==|true|300",
            "pnf|cu",
            "en|_pxde|330|b0f5c803143848f35b02f4ad1fae33d498dad30c6f0d47cb62f0133046d4e691:eyJ0aW1lc3RhbXAiOjE2ODM4MzAzNjAzMjR9|true|300"
          ]})
    } else if (req.body.seq == 1) {
        res.json({
            do: [
                "bake|_px3|330|a56d14e569e89cff68af14a8cf2bdd5927a27e0172ee2842f5ee3fdb0a5224f5:s6T4JtoDAiou8dD3QVV6P+a7UkNRA8UTC77GtJo60CyZmLtUXN1G51irS5vGHPzQX5F/hpWtaxV795QxfhD2BA==:1000:wN6kTPCst7S4iYlgDO29/36tJARonwhHA9h7QrQX4hGaQTqbje+8JzlwCVBDxve0HPcjeWRG21iUYMURkjL87IqXke+geXbRR1/Xz0LrI0YiVnZS9dU9UYDRme9HSyksbnTwKJPAa6DV8/YqI3CzjShYEsXfowTP09mHjSHay6b8z2QzddK2yRrJKJ2Ae8wDuIN38S4eXEyDI3K+vhpUkA==|true|300",
                "pnf|cu",
                "en|_pxde|330|b0f5c803143848f35b02f4ad1fae33d498dad30c6f0d47cb62f0133046d4e691:eyJ0aW1lc3RhbXAiOjE2ODM4MzAzNjAzMjR9|true|300"
              ]
        })
    } else {
        res.json({
            do: [
                "pnf|cu",
                "en|_pxde|330|f17a932aa1ad6e51ba36b434708f5829ca600d65a7fe9751b692e5a00a0440fa:eyJ0aW1lc3RhbXAiOjE2ODM4MzEyMDkzMTZ9|true|300"
              ]
        })
    }
    
})
//docker
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
