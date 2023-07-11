import * as d3 from 'd3';
import dataset1 from './data/tourists.csv'

export function makeAnimatedBarChart() {
  // set the dimensions
  var container = document.getElementById("svgcontainerSecondary");
  var containerWidth = container.clientWidth;
  var containerHeight = container.clientHeight;

  var margin = { top: 50, right: 50, bottom: 60, left: 50 };
  var width = containerWidth - margin.left - margin.right;
  var height = containerHeight - margin.top - margin.bottom;

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

  // Create a tooltip div
  var tooltip = d3.select("secondaryTooltip").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Get the data
  d3.csv(dataset1, function (error, data) {
    if (error) throw error;
    console.log(data); // Debug output to check the loaded data

    // Parse the data
    data.forEach(function (d) {
      d.year = d.year; // Assuming the year is already in the desired format
      d.tourists = +d.tourists || 0;
    });

    // Function to sort the data in ascending order
    function sortByAscending() {
      data.sort(function (a, b) {
        return a.tourists - b.tourists;
      });
    }

    // Function to sort the data in descending order
    function sortByDescending() {
      data.sort(function (a, b) {
        return b.tourists - a.tourists;
      });
    }

    // Function to reset the data order to the original
    function resetOrder() {
      data.sort(function (a, b) {
        return d3.ascending(a.year, b.year);
      });
    }

    // Function to animate the bars with transitions
    function animateBars() {
      // Scale the range of the data
      x.domain(data.map(function (d) {
        return d.year;
      }));
      y.domain([0, d3.max(data, function (d) {
        return d.tourists;
      })]);

      // Update the X-axis
      svg.select(".x-axis")
        .transition()
        .duration(800)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

      // Add the bars
      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.year);
        })
        .attr("y", height) // Start from the bottom
        .attr("width", x.bandwidth())
        .attr("height", 0) // Initially zero height
        .attr("fill", "steelblue")
        .on("mouseover", function (d) {
          // Show the tooltip on mouseover
          tooltip.transition()
            .duration(200)
            .style("opacity", 0.9);
          tooltip.html(d.tourists)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
          // Hide the tooltip on mouseout
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        })
        .transition()
        .duration(1600)
        .delay(function (d, i) {
          return i * 100; // Delay each bar's transition
        })
        .attr("y", function (d) {
          return y(d.tourists);
        })
        .attr("height", function (d) {
          return height - y(d.tourists);
        })
        .on("end", function () {
          // Call the next action after the bars animation completes
          performNextAction();
        });
    }

    // Initial bar animation
    animateBars();

    // Define the actions and their parameters
    var actions = [
      { action: animateSort, params: [sortByAscending] },
      { action: animateSort, params: [sortByDescending] },
      { action: resetBars }
    ];

    var currentActionIndex = 0;

    function performNextAction() {
      // Perform the current action
      var currentAction = actions[currentActionIndex];
      currentAction.action.apply(null, currentAction.params);

      // Increment the action index
      currentActionIndex++;
      if (currentActionIndex >= actions.length) {
        currentActionIndex = 0; // Reset to the beginning of the loop
      }

      // Delay before the next action
      setTimeout(function () {
        animateBars();
      }, 2000); // Adjust the delay time (in milliseconds) as needed
    }

    // Sorting functions
    function animateSort(orderFunction) {
      // Sort the data
      orderFunction();

      // Transition the bars
      svg.selectAll("rect")
        .transition()
        .duration(800)
        .delay(function (d, i) {
          return i * 100; // Delay each bar's transition
        })
        .attr("x", function (d) {
          return x(d.year);
        })
        .attr("y", function (d) {
          return y(d.tourists);
        })
        .attr("height", function (d) {
          return height - y(d.tourists);
        })
        .on("end", function () {
          // Call the next action after the sorting animation completes
          performNextAction();
        });
    }

    // Function to reset the bars to the original order
    function resetBars() {
      resetOrder();
      svg.selectAll("rect")
        .transition()
        .duration(1600)
        .delay(function (d, i) {
          return i * 100; // Delay each bar's transition
        })
        .attr("x", function (d) {
          return x(d.year);
        })
        .attr("y", function (d) {
          return y(d.tourists);
        })
        .attr("height", function (d) {
          return height - y(d.tourists);
        })
        .on("end", function () {
          // Call the next action after the resetting animation completes
          performNextAction();
        });
    }

    // Add the X Axis
    svg.append("g")
      .attr("class", "x-axis")
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
  });
}
