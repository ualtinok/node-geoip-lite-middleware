function middleware(options) {
  options = options || {};
  var fields = options.fields || ['country_code', 'continent_code'];
  var defaults = options.defaults || {
    country_code: 'US',
    continent_code: 'NA'
  };
  var strict = options.strict;
  var cache = options.cache === undefined ? true : options.cache;
  var db = options.db;
  if (!db) {
    throw new Error('You must provide `db` GeoIP object!');
  }
  return function geoIp(req, res, next){
    if(cache && req.session && req.session.geoip) {
      for(var field in fields) {
        req[fields[field]] = req.session.geoip[fields[field]];
      }
      return req.next();
    }
    db.lookup(req.ip, function(err, result) {
      result = result || defaults;
      if(err && strict) {
        return req.next(err);
      }
      if(cache) {
        req.session.geoip = fields.reduce(function(geo, field){
          geo[field] = result[field];
          return geo;
        }, {});
      }
      for(var field in fields) {
        req[fields[field]] = result[fields[field]];
      }
      req.next();
    });
  };
}

module.exports = middleware;
