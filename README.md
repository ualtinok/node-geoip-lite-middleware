# node-geoip-middleware

GeoIP middleware for Connect/Express.

## Install

With `npm` do

```
npm install geoip-middleware
```

## Usage

### middleware(options)

- `options.db` GeoIP db instance, or path to db.
- `options.type` When `db` is a path, this type of `geoip` is created.
  Defaults to `'Country'`
- `options.field` Extracted field from `geoip` result.
  Defaults to `'country_code'`.
- `options.cache` Cache result (requires session support),
  defaults to `true`.
- `options.strict` When lookup fails, handle it as an error.
  By default, when `fallback` value is present, errors are silently
  dropped, and the `fallback` value is used.
- `options.inject` Injected field name, the result will be available
  under this field in `req`. Defaults to `options.field`.
- `options.fallback` Use this value when lookup fails,
  and `strict` is false. Defaults to `'US'`.

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
