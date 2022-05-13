var config = require("./src/config")
var express = require('express');
const cors = require('cors');

var app = express();
const fs = require('fs');
const request = require('request')

app.use(express.static("build"));

app.use(cors());

var server = app.listen(config.port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

let logData=[]
app.use(express.json())   // allows post request with header application/json
app.post('/log', function(req, res) {
 
  var postData = req.body;
  postData = {id: logData.length, ...postData}
  logData.push(postData)
  fs.writeFile("./log.txt", JSON.stringify(logData), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("LogData was saved!");
  }); 
  console.log(logData);
});

app.post('/log', function(req, res) {
 
  var postData = req.body;
  postData = {id: logData.length, ...postData}
  logData.push(postData)
  fs.writeFile("./log.txt", JSON.stringify(logData), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("LogData was saved!");
  }); 
  console.log(logData);
  res.end("ok")
});

app.post("/search*", function(req, res) {
  var method = req.method.toUpperCase();
  var proxy_url = "http://127.0.0.1:" + config.meiliSearchPort + req.originalUrl.replace("/search", "")

  console.log("proxyUrl: " + proxy_url)

  var options = {
    headers: {"Connection": "close"},
    url: proxy_url,
    method: method,
    json: true,
    body: req.body
  };

  function callback(error, response, data) {
    if (!error && response.statusCode === 200) {
      res.json(data)
    }
  }

  request(options, callback);
});