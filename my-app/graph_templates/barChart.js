export function makeBarChart() {
    // set the dimensions
    var margin = { top: 50, right: 50, bottom: 60, left: 50 },
      width = 550 - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom,
      default_ratio = width / height;
  
    // Check to see if dimensions are to be changed due to window size
    if (current_ratio < default_ratio) {
      //width = window_width - 50 - margin.right;
      //height = window_height - margin.top - margin.bottom - 330;
    }
  
    // set the ranges
    var x = d3.scaleBand().range([0, width]).padding(0.1);
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
      x.domain(data.map(function (d) {
        return d.year;
      }));
      y.domain([0, d3.max(data, function (d) {
        return d.tourists;
      })]);
  
      // Add the bars
      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.year);
        })
        .attr("y", function (d) {
          return y(d.tourists);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.tourists);
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
        .text("Year");
  
      // Add the text for Y-axis
      const yLabel = svg.append("text")
        .attr("transform", "rotate(-90,15," + (height / 2) + ")")
        .attr("x", 0)
        .attr("y", height / 2 - 50)
        .style("text-anchor", "middle")
        .text("Tourists (Millions)");
  
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
  
  
  
  
  