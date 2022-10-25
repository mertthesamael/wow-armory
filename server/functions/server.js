const express = require('express')
const axios = require("axios")
const cors = require('cors')
const dotenv = require('dotenv')
const rateLimit = require('express-rate-limit')
const serverless = require("serverless-http")
const app = express()
const router = express.Router()
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
dotenv.config()

app.use(cors(), limiter)

router.get("/api", (req,res) => {

    const { charName:name, method,region,realm } = req.query

    var options = { 
        method: 'POST',
        url: 'https://oauth.battle.net/token',
        data: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.REACT_APP_BNET_ID,
          client_secret: process.env.REACT_APP_BNET_SECRET,
        })
      }; 
       
      axios.request(options).then((response) => {
  
       axios(`https://${region}.api.blizzard.com/profile/wow/character/${realm}/${name}/${method}?namespace=profile-${region}&locale=en_US&access_token=${response.data.access_token}`).then(response => {
 
        res.json({'data':response.data})
        
       })

       
       
    }).catch(function (error) {
        console.error(error);
    });
})

router.get("/test", (req,res) => {
res.json({
  'hello':'test3'
})

})
router.get("/data", (req,res) => {

  const { charName:name, method,region,realm, src } = req.query

  var options = {
      method: 'POST',
      url: 'https://oauth.battle.net/token',
      data: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_BNET_ID,
        client_secret: process.env.REACT_APP_BNET_SECRET,
      })
    };
   
    axios.request(options).then((response) => {

     axios(`https://${region}.api.blizzard.com/data/wow/media/item/${src}?namespace=static-${region}&access_token=${response.data.access_token}`).then(response => {
  
      return res.json({'data':response.data.assets[0].value})
     
     })
 
  }).catch(function (error) {
      console.error(error);
  });
})
app.use("/.netlify/functions/server", router)
module.exports.handler = serverless(app)
