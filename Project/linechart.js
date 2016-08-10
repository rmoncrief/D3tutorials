var h = 350;
var w = 400;

ms = [
  {"Month": 10, "sales": 100},
  {"Month": 20, "sales": 130},
  {"Month": 30, "sales": 250},
  {"Month": 40, "sales": 300},
  {"Month": 50, "sales": 265},
  {"Month": 60, "sales": 225},
  {"Month": 70, "sales": 180},
  {"Month": 80, "sales": 120},
  {"Month": 90, "sales": 145},
  {"Month": 100, "sales": 130}
];

var lineFun = d3.line()
    .x(function(d) { return d.Month * 3; })
    .y(function(d) { return h - d.sales; })

var svg = d3.select("body")
            .append("svg")
              .attr("width", w)
              .attr("height", h);

var viz = svg.selectAll("path")
              .data([ms])
              .enter()
              .append("path")
              .attr("d", lineFun)
              .attr("stroke", "purple")
              .attr("stroke-width", 2)
              .attr("fill", "none");

var labels = svg.selectAll("text")
                .data(ms)
                .enter()
                .append("text")
                .text( function (d) { return d.sales;})
                  .attr("x", function(d) { return d.Month * 3 - 30 })
                  .attr("y", function(d) { return h - d.sales; })
                  .attr("font-family", "sans-serif")
                  .attr("font-size", "12px")
                  .attr("fill","#666666")
                  .attr("text-anchor","start")
                  .attr("dy",".35em")
                  .attr("font-weight", function(d,i) {
                    if (i === 0 || i === (ms.length-1)) {
                      return "bold";
                    }
                    else {
                      return "normal";
                    }
                  })
