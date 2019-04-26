const CLIENT_ID = 'YOUR CLIENT HERE';
const CLIENT_SECRET = 'YOUR SECRET HERE';

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const { google } = require('googleapis');

const app = express();
const port = 8080;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'postmessage'
);

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// ROUTES
app.post('/auth/google', (req, res) => {
  var code = req.body.code;
  console.log(`Auth google endpoint: ${code}`)

  oauth2Client.getToken(code, function (err, tokens) {
    if (err) {
      res.status(422).json({ err: err });
    } else {
      res.json({ token: tokens.access_token });
    }
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))