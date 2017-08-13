const express = require('express');
const http = require('http');
const app = express();

const apiKey = "rbrurt3zgvpzkd2gtxhprat5";
const walmartAPI = "api.walmartlabs.com";


var twilio = require('twilio');

var twilioAccountSid = "AC0f9f3128f739dda1853bcad74bc6b576";
var twilioAuthToken = "578dc02fbe0a1993539def066a24c38b";

var twilio = require('twilio');
var twilioClient = twilio(twilioAccountSid, twilioAuthToken);

var jarrenNumber = "+19518949217";
var nickNumber = "+17143315393";

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    var options = {
        "params": {
            "categoryId": 3944,
            "sort": "price",
            "query": "printer"
        }
    };

    getItems(options, function(jsonRes) {
        res.render('index', {
            items: jsonRes.items
        });
    });
});

// Get individual item by itemKey
app.get('/getItem/:itemKey', function(req, res) {
    var options = {
        host: walmartAPI,
        path: encodeURI("/v1/items/" + req.params.itemKey + "?apiKey=" + apiKey + "&format=json")
    };

    var request = http.get(options, function(response) {
        var bodyChunks = [];
        response.on('data', function(chunk) {
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
            temp.productUrl = jsonRes.productUrl;

            res.type('application/json');
            res.send(item);
        });
    });
});

// Get array of items
app.get('/getItems/:categoryId/:sort/:query', function(req, res) {
    getItems(req, res, function(jsonRes) {
        res.type('application/json');
        res.send(jsonRes);
    });
});

// getItems callback function
function getItems(req, callback) {
    var categoryId = req.params.categoryId;
    var sort = req.params.sort;
    var query = req.params.query;

    var options = {
      host: walmartAPI,
      path: encodeURI("/v1/search?apiKey=" + apiKey + "&categoryId=" + categoryId + "&sort=" + sort + "&query=" + query + "&facet=on&facet.range=price:[100 TO 500]")
    };

    // Grabbing the shortened description from walmartAPI
    var request = http.get(options, function(response) {
      var bodyChunks = [];
      response.on('data', function(chunk) {
          bodyChunks.push(chunk);
      }).on('end', function() {
          var body = Buffer.concat(bodyChunks);

          var jsonRes = JSON.parse(body);
          var items = [];

          jsonRes.items.forEach(function(item) {
              var temp = {};
              temp.itemId = item.itemId;
              temp.name = item.name;
              temp.salePrice = item.salePrice;
              temp.msrp = item.msrp;
              temp.shortDescription = cleanDescription(item.shortDescription) ;
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
              temp.productUrl = item.productUrl;

              // function to sendText to registeredUsers on DB
              //if item is beig sold less than msrp, text users that want to know
              if(item.salePrice < item.msrp){
                var message = item.name + " is selling at " + item.salePrice + " which is less than MSRP of " + item.msrp;
                sendText(message, jarrenNumber);
                sendText(message, nickNumber);
              }

              items.push(temp);
          });
          jsonRes.items = items;

          return callback(jsonRes);
      })
    })

    return null;
}

function cleanDescription(desc) {
  if(typeof desc != 'undefined') {
    if(desc.length > 0) {
      desc = desc.replace('&lt;p&gt;', '');
      desc = desc.replace('&lt;/p&gt;', '');

      if(desc.length > 300) {
        desc = desc.substring(0, 296) + '...';
      }
    }
  } else {
    desc = "No Description Available";
  }

  return desc;
}

function sendText(message, phoneNumber) {
    twilioClient.messages.create({
        body: message,
        to: phoneNumber,
        from: '+18582810718'
    }).then((message) => console.log(message.sid));
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});
