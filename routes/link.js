const express = require('express')
const router = express.Router()
var crypto = require("crypto");

let Link = require('../models/link')

router.get('/links', async (req, res) => {
    try {
        const links = await Link.find()
        res.json({
            status: "OK",
            data: {
                links: links
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

router.post('/links/new', async (req, res) => {
    try {
        let slugd = req.body.slug
        if (!req.body.slug) {
            slugd = crypto.randomBytes(5).toString('hex');
        }
        const newLink = await Link.create({
            link: req.body.link,
            slug: slugd,
            ip: req.connection.remoteAddress
        })
        res.status(200).json({
            status: "OK",
            data: {
                link: newLink
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

router.get('/links/:id', async (req, res) => {
    try {
        const link = await Link.findOne({ slug: req.params.id })
        res.json({
            status: "OK",
            data: {
                link: link
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
