var bcrypt = require('bcrypt');

var obj = {
  password: '',
  saltRound: 4,
  hash: ''
};
// Middelware
function hashThis(req, res, next) {
  const saltRound = parseInt(req.body.saltRound);
  const password = req.body.password;

  console.log('Salt Rounds: ' + saltRound);
  console.log('Before hash: ' + password);

  bcrypt.hash(password, saltRound, function(err, hash) {
    console.log('After hash: ' + hash);
    obj.password = password;
    obj.saltRound = saltRound;
    obj.hash = hash;
  });

  return next();
}

function getGeneratedHash(req, res, next) {
  return next(JSON.stringify(obj));
}


module.exports.hashThis = hashThis;
module.exports.getGeneratedHash = getGeneratedHash;
