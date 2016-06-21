var brain = require("../")

var expect = require('chai').expect

describe('Brain Functions', function () {

  describe('strToAddr', function() {

    it('strToAddr is a function', function () {
      expect(( brain.strToAddr )).to.be.a('function')
    })

    it('test strToAddr(\'correcthorsebatterystaple\').toString() = \'1aZamxMGppDGiZahCUoBqUGVRU94JBehf\'', function () {
      expect(( brain.strToAddr('correcthorsebatterystaple').toString() )).to.equal('1aZamxMGppDGiZahCUoBqUGVRU94JBehf')
    })

    it('test strToAddr(\'correcthorsebatterystaple\', true).toString() = \'1KqAv2r2iebeEhkoKonksJwwPczwBjLMXC\'', function () {
      expect(( brain.strToAddr('correcthorsebatterystaple', true).toString() )).to.equal('1KqAv2r2iebeEhkoKonksJwwPczwBjLMXC')
    })

  })

})
