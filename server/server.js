const express = require('express')
const app = express()
const axios = require("axios")
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
app.use(cors())

app.get("/api", (req,res) => {

    const { charName:name, method,region } = req.query

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
  
       axios(`https://${region}.api.blizzard.com/profile/wow/character/draenor/${name}/${method}?namespace=profile-${region}&locale=en_US&access_token=${response.data.access_token}`).then(response => {

        res.json({'data':response.data})
      
       })

       
       
    }).catch(function (error) {
        console.error(error);
    });
})


app.listen(5000, () =>{console.log("Server started on port 5000")})