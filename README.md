# d3-er

Custom d3 module created using some d3-modules(d3-selection,d3-transition etc.) and some extra functions 

## Installing

If you use NPM, `npm install d3-er`.

and require it in file :

```js
var d3 = require('d3-er/build/d3-er');
d3.select('body').style('background-color', 'red');
```

##download file
- https://github.com/EshwarRachala/d3-er/blob/master/build/d3-er.js.

##Test in browser
- To test clone https://github.com/EshwarRachala/d3-er.git
- run `npm install` to install dependencies 
- and `npm run dev` to run webpack dev server

##Check examples
https://d3examples.surge.sh


## API Reference

### d3 modules Reference
- https://github.com/d3/d3/blob/master/API.md

### d3.bullet()
- Creates bullet chart 

### d3.svg
- creates SVG element 

```js
 var svg = d3.svg('body')
svg.style('background-color', 'lime')
    .attr('height', 200)
```

       
