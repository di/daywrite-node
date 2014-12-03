var expressSession = require('express-session');
var RedisStore = require('connect-redis')(expressSession);

module.exports = function Sessions(url, secret) {
  var store = new RedisStore({ url: url });
  var session = expressSession({
    secret: secret,
    store: store,
    resave: true,
    saveUninitialized: true
  });

  return session;
};
