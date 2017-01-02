import * as d3_selection from 'd3-selection'

export default function (elem, options) {
    var body = d3_selection.select(elem)

    var svg = body.append('svg')

    if (options && options.width && options.margin && options.margin.left && options.margin.right) {

        svg.attr('width', options.width + options.margin.left + options.margin.right)

    } else if (options && options.width) {

        svg.attr('width', options.width)

    }

    if (options && options.height && options.margin && options.margin.top && options.margin.bottom) {

        svg.attr('height', options.height + options.margin.top + options.margin.bottom)

    } else if (options && options.height) {

        svg.attr('height', options.height)

    }

    return svg
}