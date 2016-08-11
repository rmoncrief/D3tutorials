var h = 120;
var w = 300;
var pad = 2;
var ds = [5,10,13,19,21,25, 11, 25, 22, 18, 7];
var svg = d3.select("body")
            .append("svg")
              .attr("width",w)
              .attr("height",h);

function colorPicker(v) {
  if (v <= 20) {
    return "#666666";
  }
  else if (v > 20) {
    return "#FF0033";
  }
}

svg.selectAll("rect")
  .data(ds)
  .enter()
  .append("rect")
    .attr("x", function(d,i) {
      return i * (w /ds.length);
    })
    .attr("y", function(d) {
      return ( h - d*4);
    })
    .attr("width", w/ds.length - pad)
    .attr("height", function(d,i) {
      return (d*4);
    })
    .attr("fill",function(d) {
      return colorPicker(d);
    })
    .on("mouseover", function(d) {
      svg.append("text")
          .text(d)
          .attr("text-anchor", "middle")
          .attr("x",parseFloat(d3.select(this).attr("x")) +
                    parseFloat(d3.select(this).attr("width")/2))
          .attr("y",parseFloat(d3.select(this).attr("y")) + 12)
          .style("font-family","sans-serif")
          .style("font-size", 12)
          .style("fill", "#ffffff")
          .attr("id", "tooltip");
    })
    .on("mouseout", function() {
      d3.select("#tooltip").remove();
    });
