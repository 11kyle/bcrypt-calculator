var bcrypt = require('bcrypt');
// Middelware
function hashThis(req, res, next) {
  const saltRound = parseInt(req.body.saltRound);
  const password = req.body.password;

  console.log('Salt Rounds: ' + saltRound);
  console.log('Before hash: ' + password);

  bcrypt.hash(password, saltRound, function(err, hash) {
    console.log('After hash: ' + hash);
  });

  return next();
}

module.exports.hashThis = hashThis;
