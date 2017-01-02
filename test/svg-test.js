var tape = require('tape-catch'),
    jsdom = require('jsdom'),
    d3 = require('../build/d3-er')


tape('d3 creates a svg element', function (test) {
    var document = jsdom.jsdom()
    global.document = document

    var svg = d3.svg('body')
    test.ok(svg, 'svg element exists')
    delete global.document
    test.end()
})

tape('d3 can set height and width on svg element', function (test) {

    var document = jsdom.jsdom()
    global.document = document

    var svg = d3.svg('body')


    test.ok(svg, 'svg element exists')
    test.ok(svg.attr('width', '100%'), 'svg element has correct width')
    test.ok(svg.attr('height', 100), 'svg element has correct height')

    delete global.document

    test.end()
})