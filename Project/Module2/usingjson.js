var h = 100;
var w = 400;
var ds;
var salesTotal = 0.0;
var salesAvg = 0.0
var metrics = [];

function buildLine(lineColor) {
  var lineFun = d3.line()
                  .x(function(d) { return ((d.month - 20130001)/3.25)})
                  .y(function(d) { return h - d.sales});

  var svg = d3.select("body")
              .append("svg")
                .attr("width", w)
                .attr("height", h);

  var viz = svg.selectAll("path")
                .data([ds])
                .enter()
                .append("path")
                  .attr("d", lineFun)
                  .attr("stroke", lineColor)
                  .attr("stroke-width", 2)
                  .attr("fill", "none");
};

function showTotals() {
  var t = d3.select("body")
            .append("table");

  for (var i = 0; i < ds.length; i++) {
    salesTotal += ds[i]["sales"] * 1;
  }
  salesAvg = salesTotal/ds.length;

  metrics.push("Sales Total: " + salesTotal);
  metrics.push("Sales Avg: " + salesAvg.toFixed(2));
  var tr = t.selectAll("tr")
            .data(metrics)
            .enter()
            .append("tr")
            .append("td")
              .text(function(d){return d;});
};

d3.csv("MonthlySales.csv", function(error,data) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(data);
    ds = data
  }
  buildLine("purple");
  showTotals();
});
