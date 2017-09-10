var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

var mid = require('./middleware');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs')

app.get('/', function(req, res) {
  res.render('index');
})


// generateHash
app.post('/api/hash', mid.hashThis, function(req, res, next) {

  res.sendStatus(200);
})






app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
