// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 20, left: 20},
width = 350 - margin.left - margin.right,
height = 250 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
   .x(function(d) { return x(d.year); })
   .y(function(d) { return y(d.population); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#svgcontainerSecondary").append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g").attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("data.csv", function(error, data) {
   if (error) throw error;
   // format the data
   data.forEach(function(d) {
      d.year = d.year;
      d.population = +d.population;
   });

   // Scale the range of the data
   x.domain(d3.extent(data, function(d) { return d.year; }));
   y.domain([0, d3.max(data, function(d) { return d.population; })]);

   // Add the valueline path.
   svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

   // Add the X Axis
   svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

   // Add the Y Axis
   svg.append("g")
      .call(d3.axisLeft(y));
});


// set the dimensions and margins of the graph
var margin2 = { top: 20, right: 20, bottom: 20, left: 20 },
  width2 = 500 - margin2.left - margin2.right,
  height2 = 250 - margin2.top - margin2.bottom;

// set the ranges
var x2 = d3.scaleTime().range([0, width2]);
var y2 = d3.scaleLinear().range([height2, 0]);

// define the line
var valueline2 = d3
  .line()
  .x(function (d) {
    return x(d.date);
  })
  .y(function (d) {
    return y(d.movingAverage);
  });

// append the svg object to the "svgcontainerPrimary" div
var svg2 = d3
  .select("#svgcontainerPrimary")
  .append("svg")
  .attr("width", width2 + margin2.left + margin2.right)
  .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
  .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

// Get the data
d3.csv("temperature.csv", function (error, data2) {
  if (error) throw error;

  // Format the data
  var parseDate = d3.timeParse("%Y-%m-%d");
  data2.forEach(function (d) {
    d.date = parseDate(d.date);
    d.temperature = +d.temperature;
  });

  // Compute moving average
  var numDays = 7; // Number of days for the moving average
  data2.forEach(function (d, i) {
    var start = Math.max(0, i - numDays);
    var end = i + 1;
    var sum = 0;
    for (var j = start; j < end; j++) {
      sum += data2[j].temperature;
    }
    d.movingAverage = sum / (end - start);
  });

  // Scale the range of the data
  x.domain(d3.extent(data2, function (d) {
    return d.date;
  }));
  y.domain([0, d3.max(data2, function (d) {
    return d.temperature;
  })]);

  // Add the valueline2 path.
  svg2.append("path")
    .data([data2])
    .attr("class", "line")
    .attr("d", valueline2)
    .attr("fill", "steelblue");

  // Add the X Axis
  svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x2));

  // Add the Y Axis
  svg2.append("g")
    .call(d3.axisLeft(y2));
});