var h = 100;
var w = 350;
var salesTotal = 0.0;
var salesAvg = 0.0;
var pad = 20;

//d is passed in
function getDate(d) {
  var strDate = new String(d);

  var year = strDate.substr(0,4);
  var month = strDate.substr(4,2) - 1;
  var day = strDate.substr(6,2);

  return new Date(year,month,day);
}

//ds is passed in
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
                .attr("height", h)
                .attr("id","svg-"+ds.category);

  var yAxis = svg.append("g").call(yAxisGen)
                .attr("class", "y-axis")
                .attr("transform", "translate(" + pad + ", 0)");

  var xAxis = svg.append("g").call(xAxisGen)
                .attr("class", "x-axis")
                .attr("transform", "translate(5," + (h-pad + 1) + ")");

  var viz = svg.selectAll(".path-"+ds.category)
                .data([ds.monthlySales])
                .enter()
                .append("path")
                  .attr("d", lineFun)
                  .attr("stroke", "purple")
                  .attr("stroke-width", 2)
                  .attr("fill", "none")
                  .attr("class","path-"+ds.category);
};

function updateLine(ds) {

  var minDate = getDate(ds.monthlySales[0]["month"]);
  var maxDate = getDate(ds.monthlySales[ds.monthlySales.length-1]["month"]);

  var xscale = d3.scaleTime()
                 .domain([minDate,maxDate])
                 .range([pad + 5, w - pad]);

  var yscale = d3.scaleLinear()
                  .domain([0,d3.max(ds.monthlySales, function(d){return d.sales;}) ])
                  .range([h - pad, 10]);

  var xAxisGen = d3.axisBottom(xscale).tickFormat(d3.timeFormat("%b")).ticks(ds.monthlySales.length-1);

  var yAxisGen = d3.axisLeft(yscale).ticks(4);

  var lineFun = d3.line()
                  .x(function(d) {return xscale(getDate(d.month));})
                  .y(function(d) {return yscale(d.sales);});

  var svg = d3.select("body").select("#svg-"+ds.category);

  var yAxis = svg.selectAll("g.y-axis").call(yAxisGen);

  var xAxis = svg.selectAll("g.x-axis").call(xAxisGen);

  var viz = svg.selectAll(".path-"+ ds.category)
                  .data([ds.monthlySales])
                  .transition()
                  .duration(1000)
                  .attr("d", lineFun);

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
   console.log("error ",error);
  }
  else {
   console.log("data: ",data);
  }

  var decodedData = JSON.parse(window.atob(data.content));

  console.log("contents: ",decodedData);

  decodedData.contents.forEach(function(content) {
    ds = content;
    showHeader(ds);
    buildLine(ds);
  //  showTotals(ds);
  });

  //Add event listener
  d3.select("select")
    .on("change", function(d,i) {
      var sel = d3.select("#date-option").node().value;

      var decodedData = JSON.parse(window.atob(data.content));

      decodedData.contents.forEach(function(ds) {
        ds.monthlySales.splice(0,ds.monthlySales.length-sel);
        updateLine(ds);

      });
    })

});
