# node-geoip-middleware

GeoIP middleware for Connect/Express. Can be used with
[`geoip`](http://github.com/kuno/GeoIP),
[`geoip-static`](http://github.com/toots/GeoIP) or
any service that has a `lookup(ip, callback)` method.

## Install

With `npm` do

```
npm install geoip-middleware
```

## Usage

### middleware(options)

- `options.db` GeoIP db instance.
- `options.fields` Extracted fields from `geoip` result.
  Defaults to `['country_code', 'continent_code]'`.
- `options.cache` Cache result (requires session support),
  defaults to `true`.
- `options.strict` When lookup fails, handle it as an error.
  By default, errors are silently dropped,
  and the `defaults`s value is used.
- `options.defaults` Default values, when lookup fails.
  Defaults: `{ country_code: 'US', continent_code: 'NA' }`.

## Example

```js
var geoip = require('geoip');
var middleware = require('geoip-middleware');
var express = require('express');

var db = new geoip.Country('path/to/db');

var app = express();

app.use(middleware({
  db: db,
  cache: false
}));

app.get('/', function(req, res) {
  res.send('Yo r here: ' + req.country_code);
});

app.listen(3000);
```
