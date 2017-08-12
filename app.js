const express = require('express')
const app = express()
const apiKey = "rbrurt3zgvpzkd2gtxhprat5"
const walmartAPI = "api.walmartlabs.com"
const http = require('http')

app.get('/getItem/:itemKey', function (req, res) {
  var options = {
    host: walmartAPI,
    path: "/v1/items/"+req.params.itemKey+"?apiKey="+apiKey+"&format=json"
  }

  var request = http.get(options, function(response) {
    var bodyChunks =[];

    response.on('data', function(chunk){
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
//      console.log('BODY' + body);
      res.type('application/json');
      res.send(body);
    })

  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
