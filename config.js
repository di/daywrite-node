module.exports = {

  // Services
  mongo_url: process.env.MONGOHQ_URL || 'mongodb://localhost/daywrite',
  redis_url: process.env.REDISCLOUD_URL || 'redis://localhost',
  rabbit_url: process.env.CLOUDAMQP_URL || 'amqp://localhost',
  port: int(process.env.PORT) || 3000,

  // Security
  cookie_secret: process.env.SECRET_KEY || 'myCookieSecret'

};

function bool(str) {
  if (str == void 0) return false;
  return str.toLowerCase() === 'true';
}

function int(str) {
  if (!str) return 0;
  return parseInt(str, 10);
}

function float(str) {
  if (!str) return 0;
  return parseFloat(str, 10);
}
