var brain = require("../")

var expect = require('chai').expect

var haystack = [
  '1aZamxMGppDGiZahCUoBqUGVRU94JBehf'
]

describe('Brain Functions', function () {

  describe('stringToAddress', function() {

    it('stringToAddress is a function', function () {
      expect(( brain.stringToAddress )).to.be.a('function')
    })

    it('test stringToAddress(\'correcthorsebatterystaple\', true).toString() = \'1aZamxMGppDGiZahCUoBqUGVRU94JBehf\'', function () {
      expect(( brain.stringToAddress('correcthorsebatterystaple', true).toString() )).to.equal('1aZamxMGppDGiZahCUoBqUGVRU94JBehf')
    })

    it('test stringToAddress(\'correcthorsebatterystaple\', false).toString() = \'1KqAv2r2iebeEhkoKonksJwwPczwBjLMXC\'', function () {
      expect(( brain.stringToAddress('correcthorsebatterystaple', false).toString() )).to.equal('1KqAv2r2iebeEhkoKonksJwwPczwBjLMXC')
    })

  })


})
