const express = require('express')
const router = express.Router()
let PX = require('../models/px')

router.use(express.text());
router.get('/px/all', async (req, res) => {
    try {
        const d = await PX.find()
        res.json({
            status: "OK",
            data: {
                px: d 
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

router.post('/px/new', async (req, res) => {
    req.body = JSON.parse(req.body)
    try {
        const newPX = await PX.create({
            payload: req.body.payload,
            uuid: req.body.uuid,
            startTime: req.body.startTime,
            extra: req.body.extra
        })
        res.status(200).json({
            status: "OK",
            data: {
                PX: newPX
            }
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: "ERROR",
            data: {
                error: e
            }
        })
    }
})

router.get('/px/:id', async (req, res) => {
    try {
        const PX = await PX.findById(req.params.id)
        res.json({
            status: "OK",
            data: {
                PX: PX
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
