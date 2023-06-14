import * as d3 from 'd3';
import dataset1 from './data/data.csv';

// PRE-GRAPH CALCULATIONS - KEEP THESE IN YOUR CODE (used for all graphs)
var window_width = window.innerWidth, 
window_height = window.innerHeight,
current_ratio = window_width / window_height;

export function makeGraph2(){
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

    
  d3.select("#svgcontainerSecondary svg").remove();

  // append the svg to the svgcontainerSecondary
  var svg = d3.select("#svgcontainerSecondary").append("svg")
    .attr("width", width + margin.left + margin.right) // determines width
    .attr("height", height + margin.top + margin.bottom) // determines height
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Get the data
  d3.csv(dataset1, function(error, data) {
    if (error) throw error;
    console.log(data); // Debug output to check the loaded data

    var parseDateA = d3.timeParse("%Y");
    data.forEach(function(d) {
        d.year = parseDateA(d.year);
        d.population = +d.population || 0;
    });
    
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.population; })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline)
        .style("fill", "none");

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
    function showTooltipA(d) {
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
      .on("mouseover", function (d) {
        showTooltipA(d);
      })
      .on("mouseout", function () {
        hideTooltipA();
      });
    
  });
}


