var tape = require("tape"),
    d3 = require("../build/d3-er");

tape("d3 returns custom function bullet.", function (test) {
    test.equal(d3.bullet(), 'Hello World');
    test.end();
});