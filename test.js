'use strict'

var test = require('tape')
var Bluebird = require('bluebird')
var Q = require('q')
var createSpreadable = require('./')

test(function (t) {
  t.test('Bluebird:then', function (t) {
    return createSpreadable(Bluebird, function (resolve) {
      resolve('foo')
    })
    .then(function (value) {
      t.equal(value, 'foo')
      t.end()
    })
  })
  t.test('Bluebird:then multiple arguments', function (t) {
    return createSpreadable(Bluebird, function (resolve) {
      resolve(['foo', 'bar'])
    })
    .then(function (value) {
      t.deepEqual(value, ['foo', 'bar'])
      t.end()
    })
  })
  t.test('Bluebird:spread', function (t) {
    return createSpreadable(Bluebird, function (resolve) {
      resolve(['foo', 'bar'])
    })
    .spread(function (first, second) {
      t.equal(first, 'foo')
      t.equal(second, 'bar')
      t.end()
    })
  })
  t.test('Q:then', function (t) {
    return createSpreadable(Q.Promise, function (resolve) {
      resolve('foo')
    })
    .then(function (value) {
      t.equal(value, 'foo')
      t.end()
    })
  })
  t.test('Q:then multiple arguments', function (t) {
    return createSpreadable(Q.Promise, function (resolve) {
      resolve(['foo', 'bar'])
    })
    .then(function (value) {
      t.deepEqual(value, ['foo', 'bar'])
      t.end()
    })
  })
  t.test('Q:spread', function (t) {
    return createSpreadable(Q.Promise, function (resolve) {
      resolve(['foo', 'bar'])
    })
    .spread(function (first, second) {
      t.equal(first, 'foo')
      t.equal(second, 'bar')
      t.end()
    })
  })
})
