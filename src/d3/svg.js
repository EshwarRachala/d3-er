import * as d3_selection from 'd3-selection'

export function SVG(elem) {

    if (!arguments.length) return null

    var svg = d3_selection.select(elem).append('svg')

    svg.attr('width', '100%')

    svg.attr('height', 100)

    return svg
}

export default SVG