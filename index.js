// index.js
// where your node app starts

// init project

var express = require("express");

var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});


//Checks if input is a date

function isDate(input) {
  const dateObject = new Date(input);
  return !isNaN(dateObject) && dateObject instanceof Date;
}

// Return true if input is a valid timestamp, false otherwise
function isValidUnixTimestamp(input) {
  const unixTimestamp = parseInt(input, 10);
  return !isNaN(unixTimestamp) && unixTimestamp >= 0;
}

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  // Check if the date parameter is provided
  if (dateParam) {
    // Check if it's a valid Unix timestamp
    if (!isNaN(dateParam) && isValidUnixTimestamp(dateParam)) {
      let timestamp = req.params.date;
      let dateFromUnix = new Date(parseInt(timestamp));
      let dateInString = dateFromUnix.toUTCString();
      res.json({ unix: timestamp, utc: dateInString });
    }
    // Check if it's a valid date
    else if (isDate(dateParam)) {
      let date = req.params.date;
      let requestedDate = new Date(date);
      let timeStamp = requestedDate.getTime();
      let dateInString = requestedDate.toUTCString();
      res.json({ unix: timeStamp, utc: dateInString });;
    } else {
      res.json({ error: "Invalid Date" });
    }
  } else {
    const currentUnixTime = Math.floor(Date.now() / 1000); // Convert to seconds
    res.json({ unix: currentUnixTime });
  }
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
