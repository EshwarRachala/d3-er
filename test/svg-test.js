var tape = require('tape-catch'),
    jsdom = require('jsdom'),
    d3 = require('../build/d3-er')


tape('d3 creates an svg element', function (test) {
    var document = jsdom.jsdom()
    global.document = document
    var svg = d3.svg('body')
    test.ok(svg, 'svg element exists')
    delete global.document
    test.end()
})

tape('d3 can set height and with on svg element', function (test) {
    var document = jsdom.jsdom()
    global.document = document
    var svg = d3.svg('body', {
        width: 100,
        height: 50
    })
    test.ok(svg, 'svg element exists')
    test.ok(svg.attr('width', 100), 'svg element has correct width')
    test.ok(svg.attr('height', 50), 'svg element has correct height')
    delete global.document
    test.end()
})

tape('d3 can set height and width and margin on svg element', function (test) {
    var document = jsdom.jsdom()
    global.document = document

    var svg = d3.svg('body', {
        width: 100,
        height: 50,
        margin: {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1
        }
    })
    test.ok(svg, 'svg element exists')
    test.ok(svg.attr('width', 102), 'svg element has correct width with margins included')
    test.ok(svg.attr('height', 52), 'svg element has correct height with margins included')
    delete global.document
    test.end()
})

tape('d3 creates an svg element that can be appended to', function (test) {
    var document = jsdom.jsdom()
    global.document = document
    var svg = d3.svg('body')
    var g = svg.append('g')
    test.ok(g, 'g element exists')
    delete global.document
    test.end()
})