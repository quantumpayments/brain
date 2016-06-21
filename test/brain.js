var brain = require("../")

var expect = require('chai').expect

var haystack = [
  '1aZamxMGppDGiZahCUoBqUGVRU94JBehf'
]

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

  describe('both', function() {

    it('both is a function', function () {
      expect(( brain.both )).to.be.a('function')
    })

    it('test both(\'correcthorsebatterystaple\', [\'1aZamxMGppDGiZahCUoBqUGVRU94JBehf\'], true) = \'1aZamxMGppDGiZahCUoBqUGVRU94JBehf\'', function () {
      expect(( brain.both('correcthorsebatterystaple', haystack, true) )).to.equal(true)
    })

  })

  describe('check', function() {

    it('check is a function', function () {
      expect(( brain.check )).to.be.a('function')
    })

    it('test check(\'correcthorsebatterystaple\', [\'1aZamxMGppDGiZahCUoBqUGVRU94JBehf\'], false, true) = \'1aZamxMGppDGiZahCUoBqUGVRU94JBehf\'', function () {
      expect(( brain.check('correcthorsebatterystaple', haystack, false, true) )).to.equal(true)
    })

    it('test check(\'correcthorsebatt*rystaple\', [\'1aZamxMGppDGiZahCUoBqUGVRU94JBehf\'], true, true) = \'1aZamxMGppDGiZahCUoBqUGVRU94JBehf\'', function () {
      expect(( brain.check('correcthorsebatt*rystaple', haystack, true, true) )).to.equal(true)
    })

  })

})
