var w = 200;
var h = 100;
var pad = 2;
var dataset = [5, 10, 15, 20, 25];

var svg = d3.select("body")
            .append("svg")
              .attr("width", w)
              .attr("height",h);
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
      .attr("width", w / dataset.length - pad)
      .attr("height", function(d) {
        return(d*4);
      })
      .attr("y", function(d) {
        return (h-(d*4));
      })
      .attr("x", function(d,i) {
        return (i* (w/dataset.length));
      });
