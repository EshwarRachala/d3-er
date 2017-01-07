import * as d3Sel from 'd3-selection'
import * as d3Array from 'd3-array'
import * as d3Axis from 'd3-axis'
import * as d3Scale from 'd3-scale'

export default function () {
    let xValue = d => d[0]
    let yValue = d => d[1]
    const xScale = d3Scale.scaleLinear()
    const yScale = d3Scale.scaleBand()
    let margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    }
    let data = []
    let updateData

    function chart(selection) {
        selection.each(function () {
            const width = this.clientWidth - margin.left - margin.right
            const height = this.clientHeight - margin.top - margin.bottom

            data = data.map((d, i) => [xValue.call(data, d, i), yValue.call(data, d, i)])

            xScale
                .domain([0, d3Array.max(data, d => d[0])])
                .range([0, width])
                .nice()

            yScale
                .domain(data.map(d => d[1]))
                .range([height, 0])
                .padding(0.1)

            const svg = d3Sel.select(this)

            const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

            g.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3Axis.axisBottom(xScale))
                .selectAll('text')
                .style('font-size', '12px')
                .style('text-anchor', 'end')
                .attr('dx', '-.8em')
                .attr('dy', '.15em')

            g.append('g')
                .attr('class', 'y axis')
                .call(d3Axis.axisLeft(yScale))
                .selectAll('text')
                .style('font-size', '12px')
                .style('text-anchor', 'end')
                .attr('dx', '-.8em')
                .attr('dy', '.15em')

            g.selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('y', d => yScale(d[1]))
                .attr('height', yScale.bandwidth())
                .attr('width', d => xScale(d[0]))


            updateData = function update() {
                data = data.map((d, i) => [xValue.call(data, d, i), yValue.call(data, d, i)])

                xScale
                    .domain([0, d3Array.max(data, d => d[0])])
                    .range([0, width])
                    .nice()

                yScale
                    .domain(data.map(d => d[1]))
                    .range([height, 0])
                    .padding(0.1)

                const bar = g.selectAll('.bar').data(data)

                bar.enter()
                    .append('rect')
                    .merge(bar)
                    .transition()
                    .duration(2000)
                    .attr('class', 'bar')
                    .attr('y', d => yScale(d[1]))
                    .attr('height', yScale.bandwidth())
                    .attr('width', d => xScale(d[0]))

                bar.exit().remove()

                g.select('.y').transition()
                    .duration(2000).remove()
                g.select('.x').transition()
                    .duration(2000).remove()

                g.append('g')
                    .attr('class', 'x axis')
                    .transition()
                    .duration(2000)
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(d3Axis.axisBottom(xScale))
                    .selectAll('text')
                    .style('font-size', '12px')
                    .style('text-anchor', 'end')
                    .attr('dx', '-.8em')
                    .attr('dy', '.15em')

                g.append('g')
                    .attr('class', 'y axis')
                    .transition()
                    .duration(2000)
                    .call(d3Axis.axisLeft(yScale))
                    .selectAll('text')
                    .style('font-size', '12px')
                    .style('text-anchor', 'end')
                    .attr('dx', '-.8em')
                    .attr('dy', '.15em')
            }
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

    chart.data = function (_) {
        if (!arguments.length) return data
        data = _
        if (typeof updateData === 'function') updateData()
        return chart
    }

    return chart
}