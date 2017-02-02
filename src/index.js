// @flow

import moment from 'moment-timezone';

export default {
  utc: tzHelper('utc'),
  eastern: tzHelper('America/New_York'),
  central: tzHelper('America/Chicago'),
  mountain: tzHelper('America/Phoenix'),
  pacific: tzHelper('America/Los_Angeles'),
};

function tzHelper (timezone: string) {
  return {
    startOfDay: timeParser('YYYY-MM-DD', timezone),
    time: timeParser('YYYY-MM-DD HH:mm:ss', timezone),
    preciseTime: timeParser('YYYY-MM-DD HH:mm:ss.SSS', timezone),
  };
}

function timeParser (format: string, timezone: string) {
  const regexp = new RegExp(`^${format.replace(/[YMDHmsS]/g, '\\d')}$`);

  return function (input: string) {
    if (!regexp.test(input)) {
      throw new TypeError(`Expected string with format ${format} but got ${input}`);
    }
    return moment.tz(input, format, timezone).toDate();
  };
}
