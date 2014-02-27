var GeoIP = require('geoip');

function middleware(options) {
  options = options || {};
  var field = options.field || 'country_code';
  var inject = options.inject || field;
  var fallback = options.fallback || 'US';
  var strict = options.strict || false;
  var cache = options.cache === undefined ? true : options.cache;
  var type = options.type || 'Country';
  var db = options.db;
  if(typeof db === 'string') {
    db = new (GeoIP[type])(db);
  } else if (!db) {
    throw new Error('You must provide `db` GeoIP object, or db path!');
  }
  return function geoIp(req, res, next){
    if(cache && req.session[inject]) {
      req[inject] = req.session[inject];
      return req.next();
    }
    db.lookup(req.ip, function(err, result) {
      var subject = cache ? req.session : req;
      if(err && strict || err && !fallback) {
        return req.next(err);
      } else if(err) {
        subject[options.field] = fallback;
        return req.next();
      }
      if(cache) {
        req.session[inject] = value;
      }
      req[inject] = value;
      req.next();
    });
  };
}

module.exports = middleware;
