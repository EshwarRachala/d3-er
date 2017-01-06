   /* eslint-disable */
   import json from '../data/data.json'

   (function () {
       'use strict'

       var margin = {
               top: 5,
               right: 40,
               bottom: 20,
               left: 120
           },
           width = 960 - margin.left - margin.right,
           height = 50 - margin.top - margin.bottom

       var bulletchart
       var bulletsvg
       bulletchart()

       var barchart
       barchart()

       var linechart
       linechart()

       d3.selectAll('button').on('click', function () {

           bulletsvg.datum(randomize).call(bulletchart.duration(1000))

           barchart.data(json.updatebar)

           linechart.data(json.updateline)
       })

       function bulletchart() {

           bulletchart = d3.bullet().width(width).height(height)

           bulletsvg = d3.select('#bulletchart')
               .selectAll('svg')
               .data(json.bullet)
               .enter()
               .append('svg')
               .attr('class', 'bullet')
               .attr('width', width + margin.left + margin.right)
               .attr('height', height + margin.top + margin.bottom).append('g')
               .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

           bulletsvg.call(bulletchart)

           var title = bulletsvg.append('g')
               .style('text-anchor', 'end')
               .attr('transform', 'translate(-6,' + height / 2 + ')')

           title.append('text')
               .attr('class', 'title')
               .text(function (d) {
                   return d.title
               })

           title.append('text')
               .attr('class', 'subtitle')
               .attr('dy', '1em')
               .text(function (d) {
                   return d.subtitle
               })
       }

       function barchart() {

           barchart = d3.barchart()
               .x(function (d) {
                   return d.age
               }).y(function (d) {
                   return d.name
               }).margin(margin)
               .data(json.bar)

           d3.svg('#barchart').call(barchart)
       }

       function linechart() {

           var formatDate = d3.timeParse("%b %Y");

           linechart = d3.linechart()
               .x(function (d) {
                   return formatDate(d.date);
               })
               .y(function (d) {
                   return +d.price;
               })
               .margin(margin)
               .data(json.line);

           d3.svg('#linechart')
               .style('overflow', 'visible')
               .style('height', '250')
               .call(linechart)
       }

       function randomize(d) {
           if (!d.randomizer) d.randomizer = randomizer(d)
           d.ranges = d.ranges.map(d.randomizer)
           d.markers = d.markers.map(d.randomizer)
           d.measures = d.measures.map(d.randomizer)
           return d
       }

       function randomizer(d) {
           var k = d3.max(d.ranges) * .2
           return function (d) {
               return Math.max(0, d + k * (Math.random() - .5))
           }
       }

   })()

   /* eslint-enable */