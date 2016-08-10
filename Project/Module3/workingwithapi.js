var h = 100;
var w = 400;
var ds;
var salesTotal = 0.0;
var salesAvg = 0.0


function buildLine(ds) {
  var lineFun = d3.line()
                  .x(function(d) { return ((d.month - 20130001)/3.25)})
                  .y(function(d) { return h - d.sales});

  var svg = d3.select("body")
              .append("svg")
                .attr("width", w)
                .attr("height", h);

  var viz = svg.selectAll("path")
                .data([ds.monthlySales])
                .enter()
                .append("path")
                  .attr("d", lineFun)
                  .attr("stroke", "purple")
                  .attr("stroke-width", 2)
                  .attr("fill", "none");
};

function showHeader(ds) {
  d3.select("body")
    .append("h1")
    .text(ds.category + " Sales (2013)");
};

function showTotals(ds) {
  var t = d3.select("body")
            .append("table");
  // console.log("here", ds.monthlySales.length);
  for (var i = 0; i < ds.monthlySales.length; i++) {
    salesTotal += ds.monthlySales[i]["sales"] * 1;
  //  console.log(salesTotal);
  }
  salesAvg = salesTotal/ds.monthlySales.length;


  var metrics = [
  ("Sales Total: " + salesTotal),
  ("Sales Avg: " + salesAvg.toFixed(2))
];
  var tr = t.selectAll("tr")
            .data(metrics);
            tr.enter()
            .append("tr")
            .append("td")
              .text(function(d){return d;});
            tr.exit().remove();
};

//Async function
d3.json("https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json", function(error,data) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(data);
  }

  var decodedData = JSON.parse(window.atob(data.content));

  //console.log(decodedData.contents[0]);

  decodedData.contents.forEach(function(ds) {
    console.log(ds);
    showHeader(ds);
    buildLine(ds);
    showTotals(ds);

  })

});
