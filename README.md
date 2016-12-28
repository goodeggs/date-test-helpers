# date-test-helpers [![Build Status](https://travis-ci.org/goodeggs/date-test-helpers.svg?branch=master)](https://travis-ci.org/goodeggs/date-test-helpers)

**Create [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects out of strings represented in common American timezones.** The intention of this module is for it to be used to create stub test data, not for it to be used in production code, but, y'know, do what you want.

### Example

```js
import dateTestHelpers from 'date-test-helpers';

console.log(dateTestHelpers.pacific.startOfDay('1954-08-02'))
/* output: Sun Aug 02 1954 00:00:00 GMT-0700 (PDT) */

console.log(dateTestHelpers.pacific.time('2016-04-02 14:00:00'))
/* output: Sat Apr 02 2016 14:00:00 GMT-0700 (PDT) */
```

### Documentation

`date-test-helpers` exports the following objects, each representing a timezone:

| Object Name | Timezone              |
|-------------|-----------------------|
| `pacific`   | `America/Los_Angeles` |
| `mountain`  | `America/Denver`      |
| `central`   | `America/Chicago`     |
| `eastern`   | `America/New_York`    |
| `utc`       | `utc`                 |

Each object contains the following methods:

* `startOfDay('YYYY-MM-DD'): Date`
* `time('YYYY-MM-DD HH:mm:ss'): Date`

Passing in a string with any other format will throw a `TypeError`. Hours should be represented using 24-hour (military) time. All parsing and timezone math is handled by the comprehensive [moment.js](http://momentjs.com/timezone/) library.

### Contributing

I aim to keep this module very small and single-purpose. If you find a bug, please let me know by opening an issue! If you'd like to submit a pull-request, please check that all tests pass, and if you're adding new functionality or fixing a bug, please add more test coverage!

You can run tests with:

```
npm test
```
