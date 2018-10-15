// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

/********************/
/*Timestamp Microservice*/
app.get('/api/timestamp/:date_string?', (req, res)=>{
  let timeStamp;
  let dateInput = req.params.date_string;
  console.log(dateInput);
  let newDate = new Date(dateInput);
  //Check if the dateInput from the user produced a valid date
  if(isNaN(newDate)){
    console.log("the date does not work well BOOOOO!!");
    timeStamp = { unix: null, utc: "Invalid Date" }
  }else{
    console.log("the date works welll: ",newDate);
    timeStamp = { unix: newDate.getTime(), utc: newDate  }
  }
  
  res.json(timeStamp);
});
/*******************/

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});