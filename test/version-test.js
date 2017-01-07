const tape = require('tape-catch')
const d3 = require('../build/d3-er')
const jsonversion = require('../package.json')


tape('d3 verson matches with package.json version', (test) => {
    const version = d3.version
    test.equals(version, jsonversion.version)
    test.end()
})