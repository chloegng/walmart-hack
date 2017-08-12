const express = require('express')
const app = express()
const apiKey = "rbrurt3zgvpzkd2gtxhprat5"
const walmartAPI = "api.walmartlabs.com"
const http = require('http')

// Get individual item by itemKey
app.get('/getItem/:itemKey', function (req, res) {
  var options = {
    host: walmartAPI,
    path: encodeURI("/v1/items/"+req.params.itemKey+"?apiKey="+apiKey+"&format=json")
  }

  var request = http.get(options, function(response) {
    var bodyChunks =[];
    response.on('data', function(chunk){
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);

      var jsonRes = JSON.parse(body);
      var item = {};

      item.itemId = jsonRes.itemId;
      item.name = jsonRes.name;
      item.salePrice = jsonRes.salePrice;
      item.msrp = jsonRes.msrp;
      item.shortDescription = jsonRes.shortDescription;
      item.brandName = jsonRes.brandName;
      item.thumbnailImage = jsonRes.thumbnailImage;
      item.mediumImage = jsonRes.mediumImage;
      item.largeImage = jsonRes.largeImage;
      item.freeShipToStore = jsonRes.freeShipToStore;
      item.numReviews = jsonRes.numReviews;
      item.customerRating = jsonRes.customerRating;
      item.customerRatingImage = jsonRes.customerRatingImage;
      item.freeShippingOver50Dollars = jsonRes.freeShippingOver50Dollars;
      item.imageEntities = jsonRes.imageEntities;

      res.type('application/json');
      res.send(item);
    })

  })
})

// Get array of items
app.get('/getItems/:categoryId/:sort/:query', function (req, res) {
  var categoryId = req.params.categoryId;
  var sort = req.params.sort;
  var query = req.params.query;
  var options = {
    host: walmartAPI,
    path: encodeURI("/v1/search?apiKey="+apiKey+"&categoryId="+categoryId+"&sort="+sort+"&query="+query+"&facet=on&facet.range=price:[100 TO 500]")
  }

// Grabbing the shortened description from walmartAPI
  var request = http.get(options, function(response) {
    var bodyChunks =[];
    response.on('data', function(chunk){
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);

      var jsonRes = JSON.parse(body);
      var items = [];
      jsonRes.items.forEach(function(item){
        var temp = {};

        temp.itemId = item.itemId;
        temp.name = item.name;
        temp.salePrice = item.salePrice;
        temp.msrp = item.msrp;
        temp.shortDescription = item.shortDescription;
        temp.brandName = item.brandName;
        temp.thumbnailImage = item.thumbnailImage;
        temp.mediumImage = item.mediumImage;
        temp.largeImage = item.largeImage;
        temp.freeShipToStore = item.freeShipToStore;
        temp.numReviews = item.numReviews;
        temp.customerRating = item.customerRating;
        temp.customerRatingImage = item.customerRatingImage;
        temp.freeShippingOver50Dollars = item.freeShippingOver50Dollars;
        temp.imageEntities = item.imageEntities;

        items.push(temp);
      });
        jsonRes.items = items;

      res.type('application/json');
      res.send(jsonRes);
    })

  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
