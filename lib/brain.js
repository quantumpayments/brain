module.exports = {
  checkTrialsInAddresses: checkTrialsInAddresses,
  stringToAddress: stringToAddress,
  expandWildcard: expandWildcard,
  registerSuccess: registerSuccess
}

// requires
var bitcore = require('bitcore-lib')
var debug = require('debug')('find')
var fs = require('fs')

// globals
const ascii = {
  '31': '',
  '32': ' ',
  '33': '!',
  '34': '"',
  '35': '#',
  '36': '$',
  '37': '%',
  '38': '&',
  '39': "'",
  '40': '(',
  '41': ')',
  '42': '*',
  '43': '+',
  '44': ',',
  '45': '-',
  '46': '.',
  '47': '/',
  '48': '0',
  '49': '1',
  '50': '2',
  '51': '3',
  '52': '4',
  '53': '5',
  '54': '6',
  '55': '7',
  '56': '8',
  '57': '9',
  '58': ':',
  '59': ';',
  '60': '<',
  '61': '=',
  '62': '>',
  '63': '?',
  '64': '@',
  '65': 'A',
  '66': 'B',
  '67': 'C',
  '68': 'D',
  '69': 'E',
  '70': 'F',
  '71': 'G',
  '72': 'H',
  '73': 'I',
  '74': 'J',
  '75': 'K',
  '76': 'L',
  '77': 'M',
  '78': 'N',
  '79': 'O',
  '80': 'P',
  '81': 'Q',
  '82': 'R',
  '83': 'S',
  '84': 'T',
  '85': 'U',
  '86': 'V',
  '87': 'W',
  '88': 'X',
  '89': 'Y',
  '90': 'Z',
  '91': '[',
  '92': '\\',
  '93': ']',
  '94': '^',
  '95': '_',
  '96': '`',
  '97': 'a',
  '98': 'b',
  '99': 'c',
  '100': 'd',
  '101': 'e',
  '102': 'f',
  '103': 'g',
  '104': 'h',
  '105': 'i',
  '106': 'j',
  '107': 'k',
  '108': 'l',
  '109': 'm',
  '110': 'n',
  '111': 'o',
  '112': 'p',
  '113': 'q',
  '114': 'r',
  '115': 's',
  '116': 't',
  '117': 'u',
  '118': 'v',
  '119': 'w',
  '120': 'x',
  '121': 'y',
  '122': 'z',
  '123': '{',
  '124': '|',
  '125': '}',
  '126': '~',
  '127': ''
}

/**
 * Converts string to an address.
 * @param  {string} str The string to be hashed.
 * @param  {boolean} isUncompressed Uncompressed or not.
 * @return {Object} Public Key Address.
 */
function stringToAddress (str, isUncompressed) {
  var publicKey = stringToPublicKey(str)
  debug('publicKey', publicKey)
  if (isUncompressed) {
    return publicKey.uncompressed
  } else {
    return publicKey.compressed
  }
}

/**
 * Convert a string hash 256 then to a bitcoin public address.
 * @param  {string} trial The string to convert.
 * @return {Object} The public key compressed and uncompressed.
 */
function stringToPublicKey (trial) {
  var buffer = new Buffer(trial)
  var hash256 = bitcore.crypto.Hash.sha256(buffer)
  var hashBN = bitcore.crypto.BN.fromBuffer(hash256)
  var privateKey = new bitcore.PrivateKey(hashBN)

  var publicKeyUncompressed = new bitcore.PublicKey(privateKey)

  var pointx = publicKeyUncompressed.point.x.toString('hex')
  var pointy = publicKeyUncompressed.point.y.toString('hex')

  // padding left
  pointx = String('00000000' + pointx).slice(-64)
  pointy = String('00000000' + pointy).slice(-64)

  var publicKeyCompressed = new bitcore.PublicKey('04' + pointx + pointy)

  var address = {}
  address.uncompressed = publicKeyUncompressed.toAddress()
  address.compressed = publicKeyCompressed.toAddress()
  return address
}

/**
 * Check if an address is in a haystack.
 * @param  {string} address  The string to check.
 * @param  {Array<string>} addresses The haystack of values.
 * @return {boolean} Whether an address is in a haystack.
 */
function addressInAddresses (address, addresses) {
  const NOT_FOUND = -1
  return addresses.indexOf(address) !== NOT_FOUND
}

/**
 * Tests to see if an address is successful.
 * @param  {String} address The address to check.
 * @param  {Array<string>} addresses The addresses array to search against.
 * @return {boolean} Whether successful.
 */
function testAddress (address, addresses) {
  var isSuccessful = false

  if (addressInAddresses(address.toString(), addresses)) {
    isSuccessful = true
  }

  return isSuccessful
}

/**
 * Register success and output to log and file
 * @param  {string} address The address that was successful.
 * @param  {string} file The file to output to.
 */
function registerSuccess (address, file) {
  registerSuccessToLog()
  registerSuccessToFile(file, address, err => {
    if (err) {
      debug(err)
    }
  })
}

/**
 * Registers a successful search to log.
 */
function registerSuccessToLog () {
  const ITERATIONS = 100
  const SUCCESS_STRING = '########################################## success!!'

  for (let i = 0; i < ITERATIONS; i++) {
    debug(SUCCESS_STRING)
  }
}

/**
 * Registers success to a file.
 * @param {string} file=success.txt The file to write to, defaults to
 * success.txt.
 * @param {string} address The address that generated the success.
 * @param {Function} callback Callback from file creation.
 */
function registerSuccessToFile (file = 'success.txt', address, callback) {
  fs.writeFile(file, address, err => {
    if (err) {
      debug(err)
      callback(err)
    } else {
      callback(null)
    }
  })
}

/**
 * Wildcard replaces a string with a wildcard, returning an array of
 * possibilities in that wilcard position from all ascii combinations.
 * @param  {string} trial The base string to be used.
 * @param  {number} position Which position to use
 * @param  {boolean} add Whether or not to add the wildcard.
 * @return {Array} An array of possibilites.
 */
function expandWildcard (trial, position, add) {
  const ret = []

  if (!trial) return

  const first = trial.substring(0, position)
  let last
  if (add) {
    last = trial.substr(position)
  } else {
    last = trial.substr(position + 1)
  }

  for (let i = 31; i < 128; i++) {
    ret.push(first + ascii[i] + last)
  }

  return ret
}

/**
 * Checks a string or array of strings that hash to a haystack address.
 * @param  {Array} trials String or array of strings to check.
 * @param  {Array} addresses Array of addresses to check.
 * @return {string} the trial that was successful or null
 */
function checkTrialsInAddresses (trials, addresses) {
  var isSuccessful
  var isUncompressed

  var result = null

  trials = [].concat(trials)

  trials.forEach((trial) => {
    isUncompressed = true
    isSuccessful = testTrial(trial, addresses, isUncompressed)
    debug('trial', trial, 'isUncompressed', isUncompressed, 'isSuccessful', isSuccessful)
    if (isSuccessful) {
      result = trial
    }

    isUncompressed = false
    isSuccessful = testTrial(trial, addresses, isUncompressed)
    debug('trial', trial, 'isUncompressed', isUncompressed, 'isSuccessful', isSuccessful)
    if (isSuccessful) {
      result = trial
    }
  })

  return result
}

/**
 * Test a trial in a set of addresses.
 * @param  {string}  trial The trial to check.
 * @param  {Array}  addresses The addresses to check against.
 * @param  {boolean} isUncompressed Whether or not is uncompressed.
 * @return {boolean} Whether the trial was successful.
 */
function testTrial (trial, addresses, isUncompressed) {
  var result = null
  let address = stringToAddress(trial, isUncompressed).toString()
  var isSuccessful = testAddress(address.toString(), addresses)
  debug('trial', trial, 'address', address, 'isUncompressed', isUncompressed, 'isSuccessful', isSuccessful)
  if (isSuccessful) {
    result = true
  }
  return result
}
