import * as d3 from 'd3';
import dataset from './data/temperature.csv'

export function makeGraph1(){
  var container = document.getElementById("svgcontainerPrimary");
  var containerWidth = container.clientWidth;
  var containerHeight = container.clientHeight;

  var margin = { top: 50, right: 50, bottom: 60, left: 50 };
  var width = containerWidth - margin.left - margin.right;
  var height = containerHeight - margin.top - margin.bottom;
  
  var xAxis = 0;

  // set the ranges
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // define the line
  var valueline = d3
    .line()
    .x(function (d) {
      return x(d.date); // Use x2 scale here
    })
    .y(function (d) {
      return y(d.movingAverage); // Use y2 scale here
    });

    
  d3.select("#svgcontainerPrimary svg").remove();
  // append the svg object to the "svgcontainerPrimary" div
  var svg = d3
    .select("#svgcontainerPrimary")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add the text for X-axis
  const xLabel = svg.append("text")
    .attr("x", width/2)
    .style("font-size", "16px")
    .attr("y", height+35)
    .style("text-anchor", "middle")
    .text("Months - 2011-2012");
    
  // Add the text for Y-axis
  const yLabel = svg.append("text")
  .attr("transform", "rotate(-90,15,"+(height/2)+")")
  .attr("x", 0)
  .attr("y", height/2-50)
  .style("text-anchor", "middle")
  .text("Temperature");

  // Get the data
  d3.csv(dataset, function (error, data) {
    if (error) throw error;

    // Format the data
    var parseDate = d3.timeParse("%Y-%m-%d");
    data.forEach(function (d) {
      d.date = parseDate(d.date);
      d.temperature = +d.temperature;
    });

    // Compute moving average
    var numDays = 7; // Number of days for the moving average
    data.forEach(function (d, i) {
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

    xAxis = d3.axisBottom().scale(x).tickFormat(d3.timeFormat("%b"));
    var formatTime = d3.timeFormat("%b");
    var formatTime2 = d3.timeFormat("%B %d, %Y");

    // Add the valueline2 path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline)
      .style("fill", "none");

    // Add the X Axis
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")") // Use height2 here
      .call(xAxis);
      //.call(d3.axisBottom(x2));

    // Add the Y Axis
    svg.append("g")
      .attr("class", "y-axis") // Add a class to the Y-axis element
      .call(d3.axisLeft(y));

    // Create the tooltip reference
  var tooltip = d3.select("#primaryTooltip");

  // Function to show the tooltip
  function showTooltip(d) {
    tooltip
      .style("left", margin.left + "px")
      .style("top", margin.top + "px")
      .style("opacity", 1)
      .html(formatTime2(d.date) + "<br/>" + "Temp: " + +d.temperature);
      //.html("Temperature: " + d2.temperature);
    }

  // Function to hide the tooltip
  function hideTooltip() {
    tooltip.style("opacity", 0);
  }

  // Add the data points as circles
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.date);
    })
    .attr("cy", function (d) {
      return y(d.movingAverage);
    })
    .attr("r", 4) // Customize the radius of the circles as needed
    .attr("fill", "steelblue")
    .on("mouseover", function (d) {
      showTooltip(d);
    })
    .on("mouseout", function () {
      hideTooltip();
    });
    


  });


  // function to refresh the graph dimensions on reaload
  /*
  // Function to update the SVG dimensions based on the container size
  function updateSvgDimensions() {
    var containerWidth = d3.select("#svgcontainerPrimary").node().getBoundingClientRect().width;
    var containerHeight = d3.select("#svgcontainerPrimary").node().getBoundingClientRect().height;

    // Adjust the dimensions based on the screen size
    var mobileWidth = 400;
    var mobileHeight = 200;
    
    if (containerWidth < mobileWidth) {
      width2 = containerWidth - margin2.left - margin2.right;
      height2 = mobileHeight - margin2.top - margin2.bottom;
    } else {
      width2 = 600 - margin2.left - margin2.right;
      height2 = 250 - margin2.top - margin2.bottom;
    }

    // Update the SVG attributes
    svg2.attr("width", containerWidth)
      .attr("height", containerHeight);
    
    // Update the x and y scales
    x2.range([0, containerWidth - margin2.left - margin2.right]);
    y2.range([containerHeight - margin2.top - margin2.bottom, 0]);

    // Update the X and Y axes
    svg2.select(".x-axis")
      .attr("transform", "translate(0," + (containerHeight - margin2.top) + ")")
      .call(xAxis);
    
    svg2.select(".y-axis")
      .call(d3.axisLeft(y2));
    
    // Update the position of the X-axis label
    xLabel2.attr("x", containerWidth / 2)
      .attr("y", containerHeight + 35);
    
    // Redraw the line and circles
    svg2.select(".line")
      .attr("d", valueline2);
    
    svg2.selectAll("circle")
      .attr("cx", function (d2) {
        return x2(d2.date);
      })
      .attr("cy", function (d2) {
        return y2(d2.movingAverage);
      });
  }

  // Call the updateSvgDimensions function initially and on window resize
  updateSvgDimensions();
  d3.select(window).on("resize", updateSvgDimensions);
  */
}