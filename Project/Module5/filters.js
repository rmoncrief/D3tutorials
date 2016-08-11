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

function showMinMax(ds, col, val, type) {
  var max = d3.max(ds, function(d) { return d[col]; } );
  var min = d3.min(ds, function(d) { return d[col]; } );

  if (type === "minmax" && (val === max || val === min)) {
    return val;
  }
  else {
    if (type === "all") {
      return val;
    }
  }
}

function salesKPI(d) {
  if (d >= 250) {
    return "#33cc66";
  }
  else if (d < 250 ) {
    return "#666666";
  }
}

var svg = d3.select("body")
            .append("svg")
              .attr("width", w)
              .attr("height", h);

var dots = svg.selectAll("circle")
              .data(ms)
              .enter()
              .append("circle")
                .attr("cx", function(d) {return d.Month * 3; })
                .attr("cy", function(d) {return h - d.sales; })
                .attr("r", 5)
                .attr("fill", function(d) { return salesKPI(d.sales);} );

var labels = svg.selectAll("text")
                .data(ms)
                .enter()
                .append("text")
                  .text(function(d) { return showMinMax(ms, "sales", d.sales, 'all');} )
                  .attr("x", function(d) {return (d.Month * 3) - 28; })
                  .attr("y", function(d) {return h - d.sales; } )
                  .attr("font-size", "12px")
                  .attr("font-family", "sans-serif")
                  .attr("fill", "#666666")
                  .attr("text-anchor", "start")

d3.select("select")
  .on("change", function(d) {
    var sel = d3.select("#label-option").node().value;
    svg.selectAll("text")
        .data(ms)
        .text(function(d) { return showMinMax(ms, "sales", d.sales,sel);})

  });
