const express = require('express')
const router = express.Router()
let Bin = require('../models/bin')

router.get('/bins', async (req, res) => {
    try {
        const bins = await Bin.find()
        res.json({
            status: "OK",
            data: {
                bins: bins
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

router.post('/bins/new', async (req, res) => {
    try {
        const newBin = await Bin.create({
            text: req.body.text,
            ip: req.connection.remoteAddress
        })
        res.status(200).json({
            status: "OK",
            data: {
                bin: newBin
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

router.get('/bins/:id', async (req, res) => {
    try {
        const bin = await Bin.findById(req.params.id)
        res.json({
            status: "OK",
            data: {
                bin: bin
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
