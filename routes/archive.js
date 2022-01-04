const express = require('express')
const router = express.Router()
let Archive = require('../models/archive.js')
let axios = require("axios")

router.get('/archive', async (req, res) => {
    try {
        const archive = await Archive.find()
        res.json({
            status: "OK",
            data: {
                archive: archive
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "ERROR",
            data: {
                error: e.msg
            }
        })
    }
})

router.get('/archive/grades/:id', async (req, res) => {
    try {
        const response = await axios.get(
            `https://pleasvalia.infinitecampus.org/campus/resources/portal/grades/detail/${req.params.id}?selectedTermID=451&selectedTaskID=4`,
            {
                headers: {
                    Cookie: "_did955411083=4bc0ed82-2af4-48af-9403-49cbfcc6db17; JSESSIONID=64FB97900350DEFE1CCBF5E80816AE54; XSRF-TOKEN=04f31d15-c3af-437f-b6fb-e858c9b9d2af; tool=; selection=; portalApp=student; portalLang=en; appName=pleasantvalley; sis-cookie=u0021YxHLoHN42lLIXbSzT5BaSdRrSyAYvBganHczBnSm7Wjoy37macDalfTn1zcsG6sB4wzXbRZE4FTc2A==",
                    Accept: "application/json, text/plain, */*",
                    "Cache-Control": "no-cache",
                    Dnt: "1",
                    Expires: "0",
                    Pragma: "no-cache",
                    "Sec-Ch-Ua": "'Not A;Brand';v='99', 'Chromium';v='96', 'Google Chrome';v='96'",
                    "Sec-Ch-Ua-Mobile": "?0",
                    "Sec-Ch-Ua-Platform": "macOS",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Gpc": "1"
                  }
            })
            console.log(response.data.details[4])
        res.json({
            status: "OK",
            data: {
                response: response.data.details[4].task.calculationPercent
            }
        })
    } catch(e) {
        res.status(400).json({
            status: "ERROR",
            data: {
                error: e.msg
            }
        })
    }
})

router.post('/archive/new', async (req, res) => {
    try {
        const newArchive = await Archive.create({
            link: req.body.link,
            title: req.body.title,
            ip: req.connection.remoteAddress
        })
        res.status(200).json({
            status: "OK",
            data: {
                archive: newArchive
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "ERROR",
            data: {
                error: e.msg
            }
        })
    }
})

router.get('/archive/:id', async (req, res) => {
    try {
        const archive = await Archive.findById(req.params.id)
        res.json({
            status: "OK",
            data: {
                archive: archive
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "ERROR",
            data: {
                error: e.msg
            }
        })
    }
})


module.exports = router;