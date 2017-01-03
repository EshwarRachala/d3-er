import * as d3_selection from 'd3-selection'
import * as d3_array from 'd3-array'
import * as d3_axis from 'd3-axis'
import * as d3_scale from 'd3-scale'

export default function () {

    var xValue = function (d) {
            return d[0]
        },
        yValue = function (d) {
            return d[1]
        },
        xScale = d3_scale.scaleLinear(),
        yScale = d3_scale.scaleBand(),
        margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        }

    function chart(selection) {
        //here selection is the element we would like to display our chart
        selection.each(function (data) {

            var width = this.clientWidth - margin.left - margin.right,
                height = this.clientHeight - margin.top - margin.bottom

            data = data.map(function (d, i) {
                return [xValue.call(data, d, i), yValue.call(data, d, i)]
            })

            xScale
                .domain([0, d3_array.max(data, function (d) {
                    return d[0]
                })])
                .range([0, width])
                .nice()

            yScale
                .domain(d3_array.extent(data, function (d) {
                    return d[1]
                }))
                .range([height, 0])
                .padding(0.1)

            var svg = d3_selection.select(this)

            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3_axis.axisBottom(xScale))
                .selectAll('text')
                .style('font-size', '12px')
                .style('text-anchor', 'end')
                .attr('dx', '-.8em')
                .attr('dy', '.15em')

            svg.append('g')
                .attr('class', 'y axis')
                .call(d3_axis.axisLeft(yScale))
                .selectAll('text')
                .style('font-size', '12px')
                .style('text-anchor', 'end')
                .attr('dx', '-.8em')
                .attr('dy', '.15em')

            svg.selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('y', function (d) {
                    return yScale(d[1])
                })
                .attr('height', yScale.bandwidth())
                .attr('width', function (d) {
                    return xScale(d[0])
                })

        })
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

    return chart
}