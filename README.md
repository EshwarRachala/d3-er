# d3-er

Custom d3 module created using some d3 modules(d3-selection,d3-transition etc.) and some extra functions 

## Installing

If you use NPM, `npm install d3-er`.

and require it in file :

```js
var d3 = require('d3-er/build/d3-er');
d3.select('body').style('background-color', 'red');
```

## Download File

- https://github.com/EshwarRachala/d3-er/blob/master/build/d3-er.js.
- https://github.com/EshwarRachala/d3-er/blob/master/build/d3-er.min.js.

## Test in browser

- To test clone https://github.com/EshwarRachala/d3-er.git
- run `npm install` to install dependencies 
- and `npm run dev` to run webpack dev server

##Check examples

- https://d3examples.surge.sh

## API Reference

### d3 modules Reference

- https://github.com/d3/d3/blob/master/API.md

## D3 modules exported

- d3-array
- d3-axis
- d3-line
- d3-scale
- d3-selection
- d3-shape
- d3-time-format
- d3-timer
- d3-transition


### Svg element 

- to create SVG element with default width(100%) and height(100) use d3.svg()

```js
 var svg = d3.svg('body')
```

- If any property needs to be changed/ added

```js
svg.style('background-color', 'lime')
    .attr('height', 200)
```
       
### Bullet Chart 

- to create bullet chart use d3.bullet()

### Bar Chart

- To create barchart follow below steps

```js
 var barchart = 
          d3.barchart()
            .x(function (d) {
                return d.age
            })
            .y(function (d) {
                return d.name
            })
            .margin(margin)
            .data(data)

d3.svg('#svgEle').call(barchart)

 ```

- To update chart with new dataset

```js
barchart.data(newdata)

 ```

### Line Chart

 - To create Line Chart follow below steps

 ```js
  var chart = d3.linechart()
           .x(function (d) {
               return formatDate(d.date);
           })
           .y(function (d) {
               return +d.price;
           })
           .margin(margin)
           .data(statetrend);

 d3.svg('#linechart')
           .style('height', '250')
           .call(chart)

```
- To update chart with new dataset

```js
chart.data(newdata)

```