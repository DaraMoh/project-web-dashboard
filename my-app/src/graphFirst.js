import * as d3 from 'd3';
import dataset1 from './data/sales.csv'

export function makeGraph1() {
  // Set the dimensions
  var container = document.getElementById("svgcontainerPrimary");
  var containerWidth = container.clientWidth;
  var containerHeight = container.clientHeight;

  var margin = { top: 50, right: 50, bottom: 120, left: 50 };
  var width = containerWidth - margin.left - margin.right;
  var height = containerHeight - margin.top - margin.bottom;

  // Set the ranges
  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  d3.select("#svgcontainerPrimary svg").remove();

  // Append the SVG to the svgcontainerPrimary
  var svg = d3
    .select("#svgcontainerPrimary")
    .append("svg")
    .attr("width", width + margin.left + margin.right) // Determines width
    .attr("height", height + margin.top + margin.bottom) // Determines height
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Get the data
  d3.csv(dataset1, function (error, data) {
    if (error) throw error;
    console.log(data); // Debug output to check the loaded data

    // Parse the data
    data.forEach(function (d) {
      d.year = d.year; // Assuming the year is already in the desired format
      d.tourists = +d.tourists || 0;
    });

    // Set the domain for x and y scales
    var xMax = d3.max(data, function (d) {
      return d.tourists;
    });
    var xMin = d3.min(data, function (d) {
      return d.tourists;
    });
    x.domain([xMin, xMax]);
    y.domain([0, data.length]);

    // Create histogram bins
    var bins = d3.histogram()
      .value(function (d) {
        return d.tourists;
      })
      .thresholds(x.ticks(10))(data);

    // Add the bars
    svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.x0);
      })
      .attr("y", function (d) {
        return y(d.length);
      })
      .attr("width", function (d) {
        return x(d.x1) - x(d.x0);
      })
      .attr("height", function (d) {
        return height - y(d.length);
      })
      .attr("fill", "steelblue")
      .on("mouseover", function (d) {
        showTooltipA(d);
      })
      .on("mouseout", function () {
        hideTooltipA();
      });

    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // Add the Y Axis
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the text for X-axis
    const xLabel = svg.append("text")
      .attr("x", width / 2)
      .style("font-size", "16px")
      .attr("y", height + 45)
      .style("text-anchor", "middle")
      .text("Tourists (Millions)");

    // Add the text for Y-axis
    const yLabel = svg.append("text")
      .attr("transform", "rotate(-90,15," + (height / 2) + ")")
      .attr("x", 0)
      .attr("y", height / 2 - 50)
      .style("text-anchor", "middle")
      .text("Frequency");

    // Create the tooltip reference
    var tooltipA = d3.select("#primaryTooltip");

    // Function to show the tooltip
    function showTooltipA(d) {
      tooltipA
        .style("left", margin.left + "px")
        .style("top", margin.top + "px")
        .style("opacity", 1)
        .html("Range: " + d.x0 + " - " + d.x1 + "<br/>Frequency: " + d.length);
    }

    // Function to hide the tooltip
    function hideTooltipA() {
      tooltipA.style("opacity", 0);
    }
  });
}
