export function makeScatterPlot() {
    var container = document.getElementById("svgcontainerSecondary");
    var containerWidth = container.clientWidth;
    var containerHeight = container.clientHeight;

    var margin = { top: 50, right: 50, bottom: 60, left: 50 };
    var width = containerWidth - margin.left - margin.right;
    var height = containerHeight - margin.top - margin.bottom;
  
    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
  
    d3.select("#svgcontainerSecondary svg").remove();
  
    // append the svg to the svgcontainerSecondary
    var svg = d3
      .select("#svgcontainerSecondary")
      .append("svg")
      .attr("width", width + margin.left + margin.right) // determines width
      .attr("height", height + margin.top + margin.bottom) // determines height
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
  
      // Scale the range of the data
      x.domain(d3.extent(data, function(d) {
        return d.year;
      })).nice();
      
      y.domain(d3.extent(data, function(d) {
        return d.tourists;
      })).nice();
  
      svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return x(d.year);
        })
        .attr("cy", function(d) {
          return y(d.tourists);
        })
        .attr("r", 4) // Adjust the radius of the circles as desired
        .attr("fill", "steelblue")
        .on("mouseover", function(d) {
          showTooltipA(d);
        })
        .on("mouseout", function() {
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
        .text("Year");
  
      // Add the text for Y-axis
      const yLabel = svg.append("text")
        .attr("transform", "rotate(-90,15," + (height / 2) + ")")
        .attr("x", 0)
        .attr("y", height / 2 - 50)
        .style("text-anchor", "middle")
        .text("Tourists (Millions)");
  
      // Add vertical grid lines
      svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)
        .tickSize(-height)
        .tickFormat("")
      );

      // Add horizontal grid lines
      svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat("")
      );
      // Create the tooltip reference
      var tooltipA = d3.select("#secondaryTooltip");
  
      // Function to show the tooltip
      function showTooltipA(d) {
        tooltipA
          .style("left", margin.left + "px")
          .style("top", margin.top + "px")
          .style("opacity", 1)
          .html("Tourists: " + d.tourists);
      }
  
      // Function to hide the tooltip
      function hideTooltipA() {
        tooltipA.style("opacity", 0);
      }
    });
  }
  
  
  
  
  