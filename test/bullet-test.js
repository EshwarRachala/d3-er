var tape = require('tape-catch'),
    d3 = require('../build/d3-er'),
    jsdom = require('jsdom')


tape('d3 returns custom function bullet.', function (test) {
    test.equal(typeof d3.bullet(), 'function')
    test.end()
})