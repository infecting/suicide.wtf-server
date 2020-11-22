const express = require('express');
const axios = require('axios')
const cheerio = require('cheerio')
var path = require('path')
var bodyParser = require('body-parser')
const router = express.Router()
router.use(bodyParser.urlencoded({ extended: true }));
router.post('/giftcard', async (req, res) => {
    console.log(req.body)
    let valids = [];
    let cards = req.body.card.split("\n")
    switch (req.body.store) {
        case 'GolfNow':
            for (let i = 0; i < cards.length; i++) {
                const url = `https://giftcard.golfnow.com/api/checkBalance?number=${cards[i]}`
                let response = await axios.get(url)
                if (response.data.balance.includes('0.00')) {
                    console.log("INVALID")
                } else {
                    let obj = { number: cards[i], balance: response.data.balance, cvv: response.data.cvv, createdAt: response.data.created }
                    valids.push(obj)
                }
            }
            res.json(valids)
        case 'Fatz':
            for (let i = 0; i < cards.length; i++) {
                const url = `https://fatz.com/balance-checker/?cn=${cards[i]}`
                let response = await axios.get(url)
                const $ = cheerio.load(response.data);
                let balance = $('#cardvalue').text()
                if (balance.includes('$0.00')) {
                    console.log("INVALID")
                } else {
                    let obj = { number: cards[i], balance: parseInt(balance) }
                    console.log(balance)
                    valids.push(obj)
                }

            }
            res.json(valids)
        case 'Erberts and Gerberts':
            for (let i = 0; i < cards.length; i++) {
                const url = `https://www.erbertandgerberts.com/wp-content/themes/erbertandgerberts/ajax/gift-card-balance.php?cardNumber=${cards[i]}`
                let response = await axios.get(url)
                const $ = cheerio.load(response.data);
                console.log(response.data)
                let balance = $('.mb0.text-xlg.text-bold.text-blue.lh1.pt05.pb05').text()
                if (balance.includes('$0.00')) {
                    console.log("INVALID")
                } else {
                    let obj = { number: cards[i], balance: parseInt(balance) }
                    console.log(balance)
                    valids.push(obj)
                }

            }
            console.log(valids)
            res.json(valids)
    }

})


router.get('/giftcard/response/capbefore/:cardno', async (req, res) => {
    res.contentType('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
    <Response>
    <Wait length="30"/>
    <GetInput inputType="speech" redirect="true" action="https://api.suicide.wtf/v1/giftcard/response/create/action/${req.params.cardno}"  method="POST"/>
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

router.post('/giftcard/response/captcha/:cardno', async (req, res) => {
    console.log("action")
    console.log(` <Response>
    <DTMF>${parseInt(req.body.UnstableSpeech)}</DTMF>
</Response>`)
    res.contentType('application/xml');
    res.send(`
    <?xml version="1.0" encoding="UTF-8"?>
        <Response>
            <DTMF>123</DTMF>
        </Response>`
    )
})

router.post('/giftcard/response/create/action/:cardno', async (req, res) => {
    console.log(req.body.Speech)
    res.contentType('application/xml');
    res.send(`
    <?xml version="1.0" encoding="UTF-8"?>
        <Response>
            <DTMF>${parseInt(req.body.Speech)}</DTMF>
            <Wait length="3"/>
            <DTMF>${req.params.cardno}</DTMF>
        </Response>`
    )
})

router.get('/giftcard/pdf/store=:store&number=:number&balance=:balance&pin=:pin', async (req, res) => {
    res.renderPDF('topgolf', { balance: req.params.balance, pin: req.params.pin, number: req.params.number })
});
module.exports = router;