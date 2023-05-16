const express = require('express')
const router = express.Router()
let PX = require('../models/px')
let Request = require('../models/request')

router.use(express.text());

router.get('/px/tls', async (req, res) => {
    if (req.secure) {
        // Retrieve TLS-related information
        const cipher = req.socket.getCipher();
        const protocol = req.socket.getProtocol();
    
        // Construct the JA3 fingerprint
        const ja3Fingerprint = `${cipher.name}-${protocol}`;
    
        // Calculate the JA3 hash
        const ja3Hash = crypto.createHash('md5').update(ja3Fingerprint).digest('hex');
    
        // Return the JA3 hash as the response
        res.json({hash: ja3Hash, cipher: cipher, protocol: protocol, fingerprint: ja3Fingerprint});
      } else {
        // Return an error response if the request is not using TLS
        res.status(400).send('TLS connection required');
      }
 });  

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
            extra: req.body.extra,
            user_agent: req.get('user-agent')
        })
        console.log(newPX);
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

router.get('/px/stats', async(req, res) => {
    try {
        const allCookies = await PX.find();
        const allRequests = await Request.find();
        let popular = {};

        //PX12555 PX11984 PX12330 PX11881 PX11881 PX12508 PX12513 PX12515 PX11547
        
        function updatePopular(userAgent, data, type) {
            if (!popular[userAgent]) {
              popular[userAgent] = {
                tls: { ja3: [], h2: [] },
                payload: { canvas: [], errors: [] }
              };
            }
            if (type == "cookies") {
                let canvas1 = diver("PX12527", data.payload);
                if (canvas1 != "NONE") {}
                let error = diver("PX11984", data.payload)
                
            } else {
                popular[userAgent].tls.ja3.push(data.ja3);
                popular[userAgent].tls.h2.push(data.h2);
            }
          }
          
          for (let i = 0; i < allRequests.length; i++) {
            updatePopular(allRequests[i].user_agent, allRequests[i], 'tls');
          }
          for (let i = 0; i < allCookies.length; i++) {
            updatePopular(allCookies[i].user_agent, allCookies[i], 'cookies');
          }
          res.json({
            status: "OK",
            data: {
                px: popular
            }
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "ERROR",
            data: {
                error: e.msg
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

function diver(param, data) {
    for (let key in data) {
        if (typeof data[key] == 'object') {
            return diver(param, data[key]);
        } else if (key == 't') {
            return diver(param, data.d);
        } else if (key == param) {
            return data[key];
        }
    }
    return "NONE";
}

module.exports = router;
