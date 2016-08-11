var w = 300;
var h = 300;


var project = d3.geoAlbers();
var path = d3.geoPath()
.projection(project);

//console.log("sanity: ", path(line));
// console.log("path: ", path);

var svg = d3.select("body")
            .append("svg")
              .attr("width", w)
              .attr("height", h);

d3.json("us.json", function(error, data) {
  if (error) {
    console.log("error: ", error);
  }
  else {
    console.log("data: ", data);
  }

    //console.log("data2 : ", path(data));
    //console.log("data.features: ", path(data.features));
  svg.selectAll(".USA")
      .data([data])
      .enter()
      .append("path")
        .attr("d", path)
        //console.log("path: ", path);
        .attr("stroke", "#666666")
        .attr("class", "USA");
});
