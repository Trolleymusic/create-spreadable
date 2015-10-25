'use strict'

var concat = require('unique-concat')
var omit = require('object-omit')

module.exports = function createSpreadable (Promise, resolver) {
  return methods(Promise).reduce(createMethod, {then: then, spread: spread})
  function createMethod (spreadable, name) {
    spreadable[name] = method(name)
    return spreadable
  }
  function method (name) {
    return function () {
      var promise = this[name]()
      return promise[name].apply(promise, arguments)
    }
  }
  function then () {
    var promise = new Promise(resolver)
    return promise.then.apply(promise, arguments)
  }
  function spread () {
    var promise = new Promise(resolver)
    return promise.spread.apply(promise, arguments)
  }
}

function methods (Promise) {
  return concat(['catch', 'finally'], Object.keys(omit(Promise.prototype, 'then', 'spread')))
}
