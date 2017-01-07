const tape = require('tape-catch')
const d3 = require('../build/d3-er')


tape('d3 returns custom function bullet.', (test) => {
    test.equal(typeof d3.bullet(), 'function')
    test.end()
})