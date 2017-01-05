   /* eslint-disable */
   (function () {
       'use strict'

       //Create Bullet Chart

       var data = [{
           'title': 'Profit',
           'subtitle': '%',
           'ranges': [20, 25, 30],
           'measures': [21, 23],
           'markers': [26]
       }, {
           'title': 'Order Size',
           'subtitle': 'US$, average',
           'ranges': [350, 500, 600],
           'measures': [100, 320],
           'markers': [550]
       }]

       var margin = {
               top: 5,
               right: 40,
               bottom: 20,
               left: 120
           },
           width = 960 - margin.left - margin.right,
           height = 50 - margin.top - margin.bottom

       var chart = d3.bullet().width(width).height(height)

       var svg = d3.select('#bulletchart')
           .selectAll('svg')
           .data(data)
           .enter()
           .append('svg')
           .attr('class', 'bullet')
           .attr('width', width + margin.left + margin.right)
           .attr('height', height + margin.top + margin.bottom).append('g')
           .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

       svg.call(chart)


       var title = svg.append('g')
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

       //Create a SVg and add color to it by using SVG function

       var bardata = [{
           'name': 'Peter',
           'age': 33
       }, {
           'name': 'Pan',
           'age': 27
       }, {
           'name': 'Json',
           'age': 37
       }]

       margin = {
           top: 10,
           right: 10,
           bottom: 30,
           left: 60
       }

       var barchart = d3.barchart()
           .x(function (d) {
               return d.age
           }).y(function (d) {
               return d.name
           }).margin(margin)
           .data(bardata)

       d3.svg('#barchart').call(barchart)
       var statetrend = [{
               'date': 'Jan 2000',
               'price': 1394.46
           },
           {
               'date': 'Feb 2000',
               'price': 102.42
           },
           {
               'date': 'Mar 2000',
               'price': 1700.58
           }
       ]

       var formatDate = d3.timeParse("%b %Y");

       debugger
       var chart = d3.linechart()
           .x(function (d) {
               return formatDate(d.date);
           })
           .y(function (d) {
               return +d.price;
           })
           .margin(margin)
           .data(statetrend);

       d3.svg('#linechart').style('overflow', 'visible').call(chart)

       d3.selectAll('button').on('click', function () {
           svg.datum(randomize).call(chart.duration(1000))

           var newdata = [{
               'name': 'Alice',
               'age': 3
           }, {
               'name': 'Brian',
               'age': 45
           }]

           barchart.data(newdata)
       })


   })()

   /* eslint-enable */