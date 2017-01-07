import * as d3Selection from 'd3-selection'

export function SVG(elem) {

    if (!arguments.length) return null

    const svg = d3Selection.select(elem).append('svg')

    svg.attr('width', '100%')

    svg.attr('height', 100)

    return svg
}

export default SVG