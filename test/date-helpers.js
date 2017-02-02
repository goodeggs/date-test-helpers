// @flow

import _ from 'lodash';
import {it, describe} from 'mocha';
import assert from 'assert';

import dateTestHelpers from '../src';

describe('date-test-helpers', function () {
  describe('zone helpers', function () {
    describe('utc', function () {
      testForTimezone({
        helper: 'utc',
        fn: 'startOfDay',
        argument: '1954-08-02',
        expected: new Date('1954-08-02T00:00:00.000Z'),
      });

      testForTimezone({
        helper: 'utc',
        fn: 'time',
        argument: '2016-04-02 14:00:00',
        expected: new Date('2016-04-02T14:00:00.000Z'),
      });

      testForTimezone({
        helper: 'utc',
        fn: 'preciseTime',
        argument: '2016-04-02 14:00:00.999',
        expected: new Date('2016-04-02T14:00:00.999Z'),
      });
    });

    describe('eastern', function () {
      testForTimezone({
        helper: 'eastern',
        fn: 'startOfDay',
        argument: '1954-08-02',
        expected: new Date('1954-08-02T04:00:00.000Z'),
      });

      testForTimezone({
        helper: 'eastern',
        fn: 'time',
        argument: '2016-04-02 14:00:00',
        expected: new Date('2016-04-02T18:00:00.000Z'),
      });

      testForTimezone({
        helper: 'eastern',
        fn: 'preciseTime',
        argument: '2016-04-02 14:00:00.999',
        expected: new Date('2016-04-02T18:00:00.999Z'),
      });
    });

    describe('central', function () {
      testForTimezone({
        helper: 'central',
        fn: 'startOfDay',
        argument: '1954-08-02',
        expected: new Date('1954-08-02T05:00:00.000Z'),
      });

      testForTimezone({
        helper: 'central',
        fn: 'time',
        argument: '2016-04-02 14:00:00',
        expected: new Date('2016-04-02T19:00:00.000Z'),
      });

      testForTimezone({
        helper: 'central',
        fn: 'preciseTime',
        argument: '2016-04-02 14:00:00.999',
        expected: new Date('2016-04-02T19:00:00.999Z'),
      });
    });

    describe('mountain', function () {
      testForTimezone({
        helper: 'mountain',
        fn: 'startOfDay',
        argument: '1954-08-02',
        expected: new Date('1954-08-02T07:00:00.000Z'),
      });

      testForTimezone({
        helper: 'mountain',
        fn: 'time',
        argument: '2016-04-02 14:00:00',
        expected: new Date('2016-04-02T21:00:00.000Z'),
      });

      testForTimezone({
        helper: 'mountain',
        fn: 'preciseTime',
        argument: '2016-04-02 14:00:00.999',
        expected: new Date('2016-04-02T21:00:00.999Z'),
      });
    });

    describe('pacific', function () {
      testForTimezone({
        helper: 'pacific',
        fn: 'startOfDay',
        argument: '1954-08-02',
        expected: new Date('1954-08-02T07:00:00.000Z'),
      });

      testForTimezone({
        helper: 'pacific',
        fn: 'time',
        argument: '2016-04-02 14:00:00',
        expected: new Date('2016-04-02T21:00:00.000Z'),
      });

      testForTimezone({
        helper: 'pacific',
        fn: 'preciseTime',
        argument: '2016-04-02 14:00:00.999',
        expected: new Date('2016-04-02T21:00:00.999Z'),
      });
    });
  });

  describe('string parsing', function () {
    it('blows up with a TypeError if the string is malformed', function () {
      assert.throws(() => dateTestHelpers.utc.startOfDay('Q'), TypeError);
      assert.throws(() => dateTestHelpers.utc.startOfDay('01-01-2017'), TypeError);
    });
  });
});

function testForTimezone ({helper, fn, argument, expected}: {
  helper: string, fn: string, argument: string, expected: Date,
}): void {
  it(`${helper}.${fn}`, function () {
    assert(_.isObject(dateTestHelpers[helper]), `Expected to find a helper called ${helper}, but did not.`);
    assert(_.isFunction(dateTestHelpers[helper][fn]), `Expected to find a function on ${helper} called ${fn}, but did not.`);

    const result = dateTestHelpers[helper][fn](argument);
    assert(_.isDate(result), `Expected result of calling ${helper}.${fn} to be a date, but got ${JSON.stringify(result)}`);

    assert.equal(result.valueOf(), expected.valueOf(), `Expected ${helper}.${fn}("${argument}") to return ${expected.toISOString()} but got ${result.toISOString()}.`);
  });
}
