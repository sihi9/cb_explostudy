var config = require("./src/config")
var express = require('express');
const cors = require('cors');

var app = express();
const fs = require('fs');
const request = require('request')
const path = require("path");

app.use(express.static(path.join(__dirname,"/build")));

app.use(cors());

var server = app.listen(config.port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

var logData = require("./log.json")
app.use(express.json())   // allows post request with header application/json
app.post('/log', function(req, res) {
 
  console.log("dirname: " + __dirname)
  console.log("./: " + process.cwd())
  var postData = req.body;
  postData = {id: logData.length, ...postData}
  logData.push(postData)
  fs.writeFile(__dirname + "/log.json", JSON.stringify(logData), function(err) {
    if(err) {
      res.status(500).end();
      return console.log(err);
    }
    console.log("LogData was saved!");
  }); 
  console.log(logData);
  res.status(200).end();
});

app.post("/search*", function(req, res) {
  var method = req.method.toUpperCase();
  var proxy_url = "http://127.0.0.1:" + config.meiliSearchPort + req.originalUrl.replace("/search", "")

  console.log("proxyUrl: " + proxy_url)
  var options = {
    headers: 
    {
      "Connection": "close",
      "authorization" : "Bearer " + config.apiKey
    },
    url: proxy_url,
    method: method,
    json: true,
    body: req.body
  };

  function callback(error, response, data) {
    if (!error && response.statusCode === 200) {
      res.json(data)
    } else {
      res.status(500).end(res.body.message)
      console.log("could not fetch data from meilisearch")
      console.log("error: " + JSON.stringify(error))
      console.log("response: " + JSON.stringify(response))
    }
  }

  request(options, callback);
});