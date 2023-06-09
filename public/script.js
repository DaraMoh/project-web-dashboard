// PRE-GRAPH CALCULATIONS
// Determine current size, which determines vars
var window_width = window.innerWidth, 
window_height = window.innerHeight,
current_ratio = window_width / window_height;

// set the dimensions
var margin = {top: 50, right: 50, bottom: 40, left: 50},
width = 400 - margin.left - margin.right,
height = 250 - margin.top - margin.bottom,
default_ratio = width/height;

// Check to see if dimensions are to be changed due to window size
if (current_ratio < default_ratio) {
  width = window_width - 50 - margin.right;
  height = window_height - margin.top - margin.bottom - 330;
}


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
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("data.csv", function(error, data) {
   if (error) throw error;
   console.log(data); // Debug output to check the loaded data

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

    // Create the tooltip reference
  var tooltipA = d3.select("#secondaryTooltip");

  // Function to show the tooltip
  function showTooltipA(event, d) {
    tooltipA
      .style("left", margin.left + "px")
      .style("top", margin.top + "px")
      .style("opacity", 1)
      .html("Population: " + d.population); 
  }

  // Function to hide the tooltip
  function hideTooltipA() {
    tooltipA.style("opacity", 0);
  }

  // Add the data points as circles
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.year);
    })
    .attr("cy", function (d) {
      return y(d.population);
    })
    .attr("r", 4) // Customize the radius of the circles as needed
    .attr("fill", "steelblue")
    .on("mouseover", function (event, d) {
      showTooltipA(event, d);
    })
    .on("mouseout", function () {
      hideTooltipA();
    });
  
});








// --------------- SECOND GRAPH --------------- //

// set the dimensions and margins of the graph
var margin2 = { top: 20, right: 20, bottom: 40, left: 50 },
  width2 = 500 - margin2.left - margin2.right,
  height2 = 250 - margin2.top - margin2.bottom,
  default_ratio2 = width2/height2;

// Check to see if dimensions are to be changed due to window size
if (current_ratio > default_ratio2) {
  width2 = window_width - 100 - margin2.right;
  height2 = window_height - margin2.top - margin2.bottom - 330;
}


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
  var formatTime = d3.timeFormat("%b");

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

  // Create the tooltip reference
var tooltip = d3.select("#primaryTooltip");

// Function to show the tooltip
function showTooltip(event, d2) {
  tooltip
    .style("left", margin2.left + "px")
    .style("top", margin2.top + "px")
    .style("opacity", 1)
    .html(formatTime(d2.date) + "<br/>" + d2.temperature);
    //.html("Temperature: " + d2.temperature);
  }

// Function to hide the tooltip
function hideTooltip() {
  tooltip.style("opacity", 0);
}

// Add the data points as circles
svg2.selectAll("circle")
  .data(data2)
  .enter()
  .append("circle")
  .attr("cx", function (d2) {
    return x2(d2.date);
  })
  .attr("cy", function (d2) {
    return y2(d2.movingAverage);
  })
  .attr("r", 4) // Customize the radius of the circles as needed
  .attr("fill", "steelblue")
  .on("mouseover", function (event, d2) {
    showTooltip(event, d2);
  })
  .on("mouseout", function () {
    hideTooltip();
  });
  


});
