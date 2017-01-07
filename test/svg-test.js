const tape = require('tape-catch')
const jsdom = require('jsdom')
const d3 = require('../build/d3-er')



tape('d3 creates a svg element', (test) => {
    const document = jsdom.jsdom()
    global.document = document

    const svg = d3.svg('body')
    test.ok(svg, 'svg element exists')
    delete global.document
    test.end()
})

tape('d3 can set height and width on svg element', (test) => {
    const document = jsdom.jsdom()
    global.document = document

    const svg = d3.svg('body')

    test.ok(svg, 'svg element exists')
    test.ok(svg.attr('width', '100%'), 'svg element has correct width')
    test.ok(svg.attr('height', 100), 'svg element has correct height')

    delete global.document

    test.end()
})