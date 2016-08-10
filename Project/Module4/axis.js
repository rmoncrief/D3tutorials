var h = 100;
var w = 400;
var ds;
var salesTotal = 0.0;
var salesAvg = 0.0;
var pad = 25;

function getDate(d) {
  var strDate = new String(d);

  var year = strDate.substr(0,4);
  var month = strDate.substr(4,2) - 1;
  var day = strDate.substr(6,2);

  return new Date(year,month,day);
}

function buildLine(ds) {

  var minDate = getDate(ds.monthlySales[0]["month"]);
  var maxDate = getDate(ds.monthlySales[ds.monthlySales.length-1]["month"]);

  var xscale = d3.scaleTime()
                 .domain([minDate,maxDate])
                 .range([pad, w - pad]);

  var yscale = d3.scaleLinear()
                  .domain([0,d3.max(ds.monthlySales, function(d){return d.sales;}) ])
                  .range([h - pad, 10]);

  var xAxisGen = d3.axisBottom(xscale).tickFormat(d3.timeFormat("%b"));

  var yAxisGen = d3.axisLeft(yscale).ticks(4);

  var lineFun = d3.line()
                  .x(function(d) {return xscale(getDate(d.month));})
                  .y(function(d) {return yscale(d.sales);});

  var svg = d3.select("body")
              .append("svg")
                .attr("width", w)
                .attr("height", h);

  var yAxis = svg.append("g").call(yAxisGen)
                .attr("class", "axis")
                .attr("transform", "translate(" + pad + ", 0)");

  var xAxis = svg.append("g").call(xAxisGen)
                .attr("class", "axis")
                .attr("transform", "translate(0," + (h-pad) + ")");

  var viz = svg.selectAll(".strokeline")
                .data([ds.monthlySales])
                .enter()
                .append("path")
                  .attr("d", lineFun)
                  .attr("stroke", "purple")
                  .attr("stroke-width", 2)
                  .attr("fill", "none")
                  .attr("class","strokeline");
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
//    console.log(error);
  }
  else {
//    console.log(data);
  }

  var decodedData = JSON.parse(window.atob(data.content));

  //console.log(decodedData.contents[0]);

  decodedData.contents.forEach(function(ds) {
  //  console.log(ds);
    showHeader(ds);
    buildLine(ds);
    showTotals(ds);

  })

});
