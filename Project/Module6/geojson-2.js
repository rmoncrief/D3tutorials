var w = 500;
var h = 300;


var project = d3.geoAlbersUsa()
                .translate([w/2, h/2])
                .scale([500]);
var path = d3.geoPath()
.projection(project);

var svg = d3.select("body")
            .append("svg")
              .attr("width", w)
              .attr("height", h);

var color = d3.scaleLinear()
              .range(['#fef0d9','#fdd49e','#fdbb84','#fc8d59','#e34a33','#b30000']);



d3.csv("salesBystate.csv", function(data) {
  color.domain([
    0,d3.max(data, function(d) { return d.sales; })
  ]);

  d3.json("us.json", function(json) {
    for (var i = 0; i < data.length; i++) {
      var salesState = data[i].state;
      var salesValue = parseInt(data[i].sales);

      for (var j = 0; j < json.features.length; j++) {
        var usState = json.features[j].properties.NAME;
        if (salesState === usState) {
          json.features[j].properties.value = salesValue;
          //console.log(usState, json.features[j].properties.value);
          break;
        }
      }
    }

    svg.selectAll(".USA")
        .data([json])
        .enter()
        .append("path")
          .attr("d", path())
          .style("fill", function(d,i) {
            console.log("value: ", d.features.properties.value, "i: ", i);
            // var value = d.features.properties.value;
            //
            // if (value) {
            //   return color(value);
            // }
            // else {
            //   return "#666666"
            // }
          })
          .attr("class", "USA");
  });
});
