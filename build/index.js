'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  utc: tzHelper('utc'),
  eastern: tzHelper('America/New_York'),
  central: tzHelper('America/Chicago'),
  mountain: tzHelper('America/Phoenix'),
  pacific: tzHelper('America/Los_Angeles')
};


function tzHelper(timezone) {
  return {
    startOfDay: timeParser('YYYY-MM-DD', timezone),
    time: timeParser('YYYY-MM-DD HH:mm:ss', timezone)
  };
}

function timeParser(format, timezone) {
  var regexp = new RegExp('^' + format.replace(/[YMDHms]/g, '\\d') + '$');

  return function (input) {
    if (!regexp.test(input)) {
      throw new TypeError('Expected string with format ' + format + ' but got ' + input);
    }
    return _momentTimezone2.default.tz(input, format, timezone).toDate();
  };
}
module.exports = exports['default'];