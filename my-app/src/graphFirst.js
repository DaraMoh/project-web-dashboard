import * as d3 from 'd3';
import dataset1 from './data/sales.csv'

export function makeGraph1() {
  // Set the dimensions
  var container = document.getElementById("svgcontainerPrimary");
  var containerWidth = container.clientWidth;
  var containerHeight = container.clientHeight;

  var margin = { top: 50, right: 50, bottom: 60, left: 50 };
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
      d.tourists = d.tourists; // Assuming the tourists is already in the desired format
      d.money = +d.money || 0;
    });

    // Set the domain for x and y scales
    var xMax = d3.max(data, function (d) {
      return d.money;
    });
    var xMin = d3.min(data, function (d) {
      return d.money;
    });
    x.domain([xMin, 50000]);
    y.domain([0, d3.max(data, function (d) { return d.length; })]);

    // Generate kernel density estimate
    var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(200));
    var density = kde(data.map(function (d) { return d.money; }));

    // Create the area path
    var area = d3.area()
      .x(function (d) { return x(d[0]); })
      .y0(height)
      .y1(function (d) { return y(d[1]); });

    // Add the area
    svg.append("path")
      .datum(density)
      .attr("class", "area")
      .attr("d", area)
      .attr("fill", "steelblue");

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
      .text("money (Millions)");

    // Add the text for Y-axis
    const yLabel = svg.append("text")
      .attr("transform", "rotate(-90,15," + (height / 2) + ")")
      .attr("x", 0)
      .attr("y", height / 2 - 50)
      .style("text-anchor", "middle")
      .text("Density");

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

  // Kernel density estimation function
  function kernelDensityEstimator(kernel, x) {
    return function (sample) {
      return x.map(function (x) {
        return [x, d3.mean(sample, function (v) { return kernel(x - v); })];
      });
    };
  }

  // Epanechnikov kernel function
  function kernelEpanechnikov(k) {
    return function (v) {
      return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
  }
}
