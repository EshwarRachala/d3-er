import * as d3Selection from 'd3-selection'
import * as d3Array from 'd3-array'
import * as d3Axis from 'd3-axis'
import * as d3Scale from 'd3-scale'
import * as d3Shape from 'd3-shape'

export default function () {
    let xValue = function (d) {
        return d[0]
    }
    let yValue = function (d) {
        return d[1]
    }
    const xScale = d3Scale.scaleTime()
    const yScale = d3Scale.scaleLinear()
    const line = d3Shape.line()
    let margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    }
    let data = []
    let updateData

    function chart(selection) {
        selection.each(function linechart() {
            const width = this.clientWidth - margin.left - margin.right
            const height = this.clientHeight - margin.top - margin.bottom

            data = data.map(function (d, i) {
                return [xValue.call(data, d, i), yValue.call(data, d, i)]
            })

            xScale
                .domain(d3Array.extent(data, (d) => {
                    return d[0]
                }))
                .range([0, width])
                .nice()

            yScale
                .domain([0, d3Array.max(data, (d) => {
                    return d[1]
                })])
                .range([height, 0])

            line.x(X).y(Y)

            let svg = d3Selection.select(this)

            let g = svg.append('g')
                .attr('transform', `translate(${  margin.left  },${  margin.top  })`)

            g.append('path')
                .data([data])
                .attr('class', 'line')
                .attr('d', line)

            g.append('g')
                .attr('class', 'x axis')
                .attr('transform', `translate(0,${  height  })`)
                .call(d3Axis.axisBottom(xScale))

            g.append('g')
                .attr('class', 'y axis')
                .call(d3Axis.axisLeft(yScale))

            updateData = function () {
                data = data.map((d, i) => {
                    return [xValue.call(data, d, i), yValue.call(data, d, i)]
                })


                xScale
                    .domain(d3Array.extent(data, (d) => {
                        return d[0]
                    }))

                yScale
                    .domain([0, d3Array.max(data, (d) => {
                        return d[1]
                    })])

                g.select('.line').transition()
                    .duration(2000)
                    .remove()

                g.select('.y').transition()
                    .duration(2000).remove()
                g.select('.x').transition()
                    .duration(2000).remove()

                line.x(X).y(Y)

                g.append('path')
                    .data([data])
                    .attr('class', 'line')
                    .attr('d', line)

                g.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', `translate(0,${  height  })`)
                    .call(d3Axis.axisBottom(xScale))

                g.append('g')
                    .attr('class', 'y axis')
                    .call(d3Axis.axisLeft(yScale))
            }
        })
    }

    function X(d) {
        return xScale(d[0])
    }

    function Y(d) {
        return yScale(d[1])
    }
    chart.x = function (_) {
        if (!arguments.length) return xValue
        xValue = _
        return chart
    }

    chart.y = function (_) {
        if (!arguments.length) return yValue
        yValue = _
        return chart
    }
    chart.margin = function (_) {
        if (!arguments.length) return margin
        margin = _
        return chart
    }

    chart.data = function (_) {
        if (!arguments.length) return data
        data = _
        if (typeof updateData === 'function') updateData()
        return chart
    }

    return chart
}