const express = require('express')
const router = express.Router()
let Archive = require('../models/archive.js')

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