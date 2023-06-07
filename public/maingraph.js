// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 20, left: 20 },
  width = 500 - margin.left - margin.right,
  height = 250 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3
  .line()
  .x(function (d) {
    return x(d.date);
  })
  .y(function (d) {
    return y(d.movingAverage);
  });

// append the svg object to the "svgcontainerPrimary" div
var svg = d3
  .select("#svgcontainerPrimary")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("temperature.csv", function (error, data) {
  if (error) throw error;

  // Format the data
  var parseDate = d3.timeParse("%Y-%m-%d");
  data.forEach(function (d2) {
    d2.date = parseDate(d2.date);
    d2.temperature = +d2.temperature;
  });

  // Compute moving average
  var numDays = 7; // Number of days for the moving average
  data.forEach(function (d2, i) {
    var start = Math.max(0, i - numDays);
    var end = i + 1;
    var sum = 0;
    for (var j = start; j < end; j++) {
      sum += data[j].temperature;
    }
    d.movingAverage = sum / (end - start);
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function (d) {
    return d.date;
  }));
  y.domain([0, d3.max(data, function (d) {
    return d.temperature;
  })]);

  // Add the valueline path.
  svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueline)
    .attr("fill", "steelblue");

  // Add the X Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
    .call(d3.axisLeft(y));
});