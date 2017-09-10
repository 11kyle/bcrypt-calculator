var express = require('express');
var bodyParser = require('body-parser');

var bcrypt = require('bcrypt');

var obj = {
  password: '',
  saltRound: 4,
  hash: ''
};
var result = false;

var app = express();

var returnThis = 'ReturnThis';

app.set('port', (process.env.PORT || 3000));

var mid = require('./middleware');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs')

app.get('/', function(req, res) {
  res.render('index');
})
/*
// getGeneratedHash
app.get('/api/hash', mid.getGeneratedHash, function(req, res, next) {
  console.log(obj.hash);
  res.json( 200 );
})

// generateHash
app.post('/api/hash', mid.hashThis, function(req, res, next) {
  res.sendStatus(200);
})
*/
// getGeneratedHash
app.get('/api/hash', function(req, res, next) {
  console.log(obj);
  res.json( obj );
})

// generateHash
app.post('/api/hash', function(req, res, next) {
  // constants
  const saltRound = parseInt(req.body.saltRound);
  const password = req.body.password;

  console.log('Salt Rounds: ' + saltRound);
  console.log('Before hash: ' + password);

  bcrypt.hash(password, saltRound, function(err, hash) {
    console.log('After hash: ' + hash);
    obj.password = password;
    obj.saltRound = saltRound;
    obj.hash = hash;
  })
  res.sendStatus(200);
})

// postComparison
app.get('/api/hash2', function(req, res, next) {
  console.log(result);
  res.json(result);
})
// getResult
app.post('/api/hash2', function(req, res, next) {
  // Declare constants
  const password = req.body.password;
  const hash = req.body.hash;

  console.log('Password: ' + password);
  console.log('Hash: ' + hash);

  bcrypt.compare(password, hash, function(err, res) {
    if (res === true) {
      console.log('True');
      return result = true;
    } else {
      console.log('False');
      return result = false;
    }
  });
  res.sendStatus(200);
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
