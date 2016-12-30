var tape = require("tape"),
    d3 = require("../d3");

tape("d3 returns custom function bullet.", function (test) {
    test.equal(d3.bullet(), 'bullet');
    test.end();
});