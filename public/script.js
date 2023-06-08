// set the dimensions and margins of the graph
var margin = {top: 50, right: 50, bottom: 40, left: 50},
width = 400 - margin.left - margin.right,
height = 250 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
   .x(function(d) { return x(d.year); })
   .y(function(d) { return y(d.population); });

// append the svg to the svgcontainerSecondary
var svg = d3.select("#svgcontainerSecondary").append("svg")
   .attr("width", width + margin.left + margin.right) // determines width
   .attr("height", height + margin.top + margin.bottom) // determines height
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
   .on("mouseover", function(d) {
    d3.select("#tooltipA")
    .transition()
    .duration(200)
    .style("opacity", 1)
    .text(d.population);
   })
   .on("mouseout", function(d) {
    d3.select("#tooltipA").style("opacity", 0)
   })
   .on("mousemove", function(d) {
    d3.select("#tooltipA")
    .style("left", d3.event.pageX + "px")
    .style("top", d3.event.pageY + "px")
   });

// Get the data
d3.csv("data.csv", function(error, data) {
   if (error) throw error;
   // format the data
   var parseDateA = d3.timeParse("%Y");
   data.forEach(function(d) {
      d.year = parseDateA(d.year);
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
  
  
   // Add the text for X-axis
  const xLabel = svg.append("text")
    .attr("x", width/2)
    .style("font-size", "16px")
    .attr("y", height+35)
    .style("text-anchor", "middle")
    .text("Year");

   // Add the text for Y-axis
  const yLabel = svg.append("text")
    .attr("transform", "rotate(-90,15,"+(height/2)+")")
    .attr("x", 0)
    .attr("y", height/2-50)
    .style("text-anchor", "middle")
    .text("Population (Millions)");
});


// -------- FIRST GRAPH - TOOLTIP -------- //

var tooltip = d3.select("#primaryTooltip")
  .append("div")
  .attr("id", "tooltipA")
  .attr("style", "position: absolute; opacity: 0");















// --------------- SECOND GRAPH --------------- //

// set the dimensions and margins of the graph
var margin2 = { top: 20, right: 20, bottom: 40, left: 50 },
  width2 = 500 - margin2.left - margin2.right,
  height2 = 250 - margin2.top - margin2.bottom;

// set the ranges
var x2 = d3.scaleTime().range([0, width2]);
var y2 = d3.scaleLinear().range([height2, 0]);

// define the line
var valueline2 = d3
  .line()
  .x(function (d2) {
    return x2(d2.date); // Use x2 scale here
  })
  .y(function (d2) {
    return y2(d2.movingAverage); // Use y2 scale here
  });

// append the svg object to the "svgcontainerPrimary" div
var svg2 = d3
  .select("#svgcontainerPrimary")
  .append("svg")
  .attr("width", width2 + margin2.left + margin2.right)
  .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
  .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

// Add the text for X-axis
const xLabel2 = svg2.append("text")
  .attr("x", width2/2)
  .style("font-size", "16px")
  .attr("y", height2+35)
  .style("text-anchor", "middle")
  .text("Months - 2011-2012");
  
// Add the text for Y-axis
const yLabel2 = svg2.append("text")
.attr("transform", "rotate(-90,15,"+(height2/2)+")")
.attr("x", 0)
.attr("y", height2/2-50)
.style("text-anchor", "middle")
.text("Temperature");

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
  x2.domain(d3.extent(data2, function (d2) {
    return d2.date;
  }));
  y2.domain([0, d3.max(data2, function (d2) {
    return d2.temperature;
  })]);

  xAxis = d3.axisBottom().scale(x2).tickFormat(d3.timeFormat("%b"));

  // Add the valueline2 path.
  svg2.append("path")
    .data([data2])
    .attr("class", "line")
    .attr("d", valueline2)
    .attr("fill", "steelblue");

  // Add the X Axis
  svg2.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height2 + ")") // Use height2 here
    .call(xAxis);
    //.call(d3.axisBottom(x2));

  // Add the Y Axis
  svg2.append("g")
    .call(d3.axisLeft(y2));



});
