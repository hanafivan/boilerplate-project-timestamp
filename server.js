// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// your first API endpoint... 
app.get("/api/:date_string", function (req, res) {
  //
  const dateParams = req.params.date_string;
  let result;
  const isValidDD = moment(dateParams, 'YYYY-MM-DD', true);
  const isValidUnix = dateParams.length === 13;
  if (isValidDD) {
    result = {utc : moment(dateParams).format('dddd, DD MMM YYYY')};
  }

  if (isValidUnix) {
    result = {unix : parseInt(dateParams)};
  } 
  if (!isValidDD && !isValidUnix) {
    result = { error : "Invalid Date" };
  }
  res.json(result);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
