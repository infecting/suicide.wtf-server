const express = require('express');
var path = require('path')
var bodyParser = require('body-parser')
const fs = require('fs');
const router = express.Router()
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/giftcard/response/capbefore/:cardno', async (req, res) => {
    res.contentType('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
    <Response>
    <Wait length="20"/>
    <GetInput inputType="speech" redirect="true" action="https://api.suicide.wtf/v1/giftcard/response/create/before/${req.params.cardno}"  method="POST"/>
    </Response>`)
})


router.get('/giftcard/response/capafter', async (req, res) => {
    res.contentType('application/xml');
    res.sendFile(__dirname + 'capafter.xml')
})

router.get('/giftcard/response/nocap', async (req, res) => {
    res.contentType('application/xml');
    res.sendFile(__dirname + 'nocap.xml')
})

router.post('/giftcard/response/create/before/:cardno', async (req, res) => {
    let code = parseInt(req.body.Speech.replace(/^\D+|\D+$/g, ""))
    console.log(`
    <?xml version="1.0" encoding="UTF-8"?>
        <Response>
            <DTMF>${code}WWWWWW1</DTMF>
            <Wait length="10"/>
            <DTMF>${req.params.cardno}#</DTMF>
            <Wait length="15"/>
        </Response>`)
    res.contentType('application/xml');
    res.send(`
    <?xml version="1.0" encoding="UTF-8"?>
        <Response>
            <DTMF>${code}WWWWWW1</DTMF>
            <Wait length="10"/>
            <DTMF>${req.params.cardno}#WWWWWWWWWWWWWW</DTMF>
        </Response>`
    )
})

router.post('/giftcard/response/create/after/:cardno', async (req, res) => {
    console.log(req.body.Speech)
    res.contentType('application/xml');
    res.send(`
    <?xml version="1.0" encoding="UTF-8"?>
        <Response>
            <DTMF>${parseInt(req.body.Speech)}</DTMF>
            <Wait length="7"/>
        </Response>`
    )
})


module.exports = router;