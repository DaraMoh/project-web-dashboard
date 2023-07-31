import * as d3 from 'd3';
import dataset1 from './data/tourists.csv'

export function makeGraph1() {
  var container = document.getElementById("svgcontainerPrimary");
  var containerWidth = container.clientWidth;
  var containerHeight = container.clientHeight;

  var margin = { top: 50, right: 50, bottom: 60, left: 50 };
  var width = containerWidth - margin.left - margin.right;
  var height = containerHeight - margin.top - margin.bottom;

  d3.select("#svgcontainerPrimary svg").remove();

  // append the svg to the svgcontainerPrimary
  var svg = d3
    .select("#svgcontainerPrimary")
    .append("svg")
    .attr("width", width + margin.left + margin.right) // determines width
    .attr("height", height + margin.top + margin.bottom) // determines height
    .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

  // Create the tooltip reference
  var tooltipA = d3.select("#primaryTooltip");

  // Function to show the tooltip
function showTooltipA(d) {
  tooltipA.html(d)  
  .style("left", ((d3.event.pageX)) + "px")     
  .style("top", (d3.event.pageY) + "px")
  .style("opacity", 1)
}


  // Function to hide the tooltip
  function hideTooltipA() {
    tooltipA.style("opacity", 0);
  }

  // Get the data
  d3.csv(dataset1, function (error, data) {
    if (error) throw error;
    console.log(data); // Debug output to check the loaded data

    // Parse the year as a Date object
    var parseDate = d3.timeParse("%Y");
    data.forEach(function (d) {
      d.year = parseDate(d.year);
      d.tourists = +d.tourists || 0;
    });

    // Set up a color scale for the pie slices
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Set up a pie generator
    var pie = d3.pie().value(function (d) {
      return d.tourists;
    });

    // Calculate the radius of the pie chart
    var radius = Math.min(width, height) / 2;

    // Generate the pie slices
    var pieData = pie(data);

    // Set up an arc generator for the pie slices
    var arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(function (d) {
        return d.data.highlighted ? radius * 1.1 : radius;
      });

    
    // Append the pie slices to the SVG
    var slices = svg
    .selectAll("path")
    .data(pieData)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", function (d, i) {
      return colorScale(i);
    })
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("fill-opacity", 1) // Set initial fill opacity to 1
    .on("mouseover", function (d, i) {
      // Reduce the fill opacity of all slices except the hovered one
      slices
        .filter(function (_, index) {
          return index !== i;
        })
        .attr("fill-opacity", 0.2);

      // Increase the stroke width and change the stroke color of the hovered slice
      d3.select(this)
        .attr("stroke-width", 4)
        .attr("stroke", "white");

      showTooltipA.call(this, d); // Pass the current slice as the context for the tooltip
    })
    .on("mouseout", function () {
      // Restore the fill opacity and stroke styles of all slices
      slices.attr("fill-opacity", 1).attr("stroke-width", 2).attr("stroke", "white");

      hideTooltipA();
    });
  });
}
