import * as d3Sel from 'd3-selection'
import * as d3Array from 'd3-array'
import * as d3Scale from 'd3-scale'
import * as d3Timer from 'd3-timer'

export default function () {
    let orient = 'left'
    let reverse = false
    let duration = 0
    let ranges = d => d.ranges
    let markers = d => d.markers
    let measures = d => d.measures

    let width = 380
    let height = 30
    let tickFormat = null

    function bulletTranslate(x) {
        return function (d) {
            return `translate(${x(d)},0)`
        }
    }

    function bulletWidth(x) {
        const x0 = x(0)
        return function (d) {
            return Math.abs(x(d) - x0)
        }
    }

    function bullet(g) {
        g.each(function (d, i) {
            const rangez = ranges.call(this, d, i).slice().sort(d3Array.descending)
            const markerz = markers.call(this, d, i).slice().sort(d3Array.descending)
            const measurez = measures.call(this, d, i).slice().sort(d3Array.descending)
            const group = d3Sel.select(this)

            const x1 = d3Scale.scaleLinear()
                .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])
                .range(reverse ? [width, 0] : [0, width])

            const x0 = this.__chart__ || d3Scale.scaleLinear()
                .domain([0, Infinity])
                .range(x1.range())

            this.__chart__ = x1

            const w0 = bulletWidth(x0)
            const w1 = bulletWidth(x1)
            const range = group.selectAll('rect.range').data(rangez)

            range.enter().append('rect')
                .attr('class', (d, i) => `range s${i}`)
                .attr('width', w0)
                .attr('height', height)
                .attr('x', reverse ? x0 : 0)
                .transition()
                .duration(duration)
                .attr('width', w1)
                .attr('x', reverse ? x1 : 0)

            range.transition()
                .duration(duration)
                .attr('x', reverse ? x1 : 0)
                .attr('width', w1)
                .attr('height', height)

            // Update the measure rects.
            const measure = group.selectAll('rect.measure')
                .data(measurez)

            measure.enter().append('rect')
                .attr('class', (d, i) => `measure s${i}`)
                .attr('width', w0)
                .attr('height', height / 3)
                .attr('x', reverse ? x0 : 0)
                .attr('y', height / 3)
                .transition()
                .duration(duration)
                .attr('width', w1)
                .attr('x', reverse ? x1 : 0)

            measure.transition()
                .duration(duration)
                .attr('width', w1)
                .attr('height', height / 3)
                .attr('x', reverse ? x1 : 0)
                .attr('y', height / 3)

            // Update the marker lines.
            const marker = group.selectAll('line.marker')
                .data(markerz)

            marker.enter().append('line')
                .attr('class', 'marker')
                .attr('x1', x0)
                .attr('x2', x0)
                .attr('y1', height / 6)
                .attr('y2', (height * 5) / 6)
                .transition()
                .duration(duration)
                .attr('x1', x1)
                .attr('x2', x1)

            marker.transition()
                .duration(duration)
                .attr('x1', x1)
                .attr('x2', x1)
                .attr('y1', height / 6)
                .attr('y2', (height * 5) / 6)

            // Compute the tick format.
            const format = tickFormat || x1.tickFormat(8)

            // Update the tick groups.
            const tick = group.selectAll('g.tick')
                .data(x1.ticks(8), d => this.textContent || format(d))

            // Initialize the ticks with the old scale, x0.
            const tickEnter = tick.enter().append('g')
                .attr('class', 'tick')
                .attr('transform', bulletTranslate(x0))
                .style('opacity', 1e-6)

            tickEnter.append('line')
                .attr('y1', height)
                .attr('y2', (height * 7) / 6)

            tickEnter.append('text')
                .attr('text-anchor', 'middle')
                .attr('dy', '1em')
                .attr('y', (height * 7) / 6)
                .text(format)

            // Transition the entering ticks to the new scale, x1.
            tickEnter.transition()
                .duration(duration)
                .attr('transform', bulletTranslate(x1))
                .style('opacity', 1)

            // Transition the updating ticks to the new scale, x1.
            const tickUpdate = tick.transition()
                .duration(duration)
                .attr('transform', bulletTranslate(x1))
                .style('opacity', 1)

            tickUpdate.select('line')
                .attr('y1', height)
                .attr('y2', (height * 7) / 6)

            tickUpdate.select('text')
                .attr('y', (height * 7) / 6)

            // Transition the exiting ticks to the new scale, x1.
            tick.exit().transition()
                .duration(duration)
                .attr('transform', bulletTranslate(x1))
                .style('opacity', 1e-6)
                .remove()
        })

        d3Timer.timerFlush()
    }

    bullet.orient = function (x) {
        if (!arguments.length) return orient
        orient = x
        reverse = orient === 'right' || orient === 'bottom'
        return bullet
    }

    bullet.ranges = function (x) {
        if (!arguments.length) return ranges
        ranges = x
        return bullet
    }

    bullet.markers = function (x) {
        if (!arguments.length) return markers
        markers = x
        return bullet
    }

    // measures (actual, forecast)
    bullet.measures = function (x) {
        if (!arguments.length) return measures
        measures = x
        return bullet
    }

    bullet.width = function (x) {
        if (!arguments.length) return width
        width = x
        return bullet
    }

    bullet.height = function (x) {
        if (!arguments.length) return height
        height = x
        return bullet
    }

    bullet.tickFormat = function (x) {
        if (!arguments.length) return tickFormat
        tickFormat = x
        return bullet
    }

    bullet.duration = function (x) {
        if (!arguments.length) return duration
        duration = x
        return bullet
    }

    return bullet
}