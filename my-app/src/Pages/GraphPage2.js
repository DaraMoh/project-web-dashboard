import React, { useEffect } from 'react';
import { makeGraph2 } from '../graphSecond';
import './GraphPageSec.css'; // Import the CSS file

const GraphPage2 = () => {
  useEffect(() => {
    makeGraph2(); // Call the makeGraph2 function to render the graph
  }, []);
  return (
    <div class = "graph-page2">
        <h1>TEST 1 PAGE TITLE</h1>
        <h3>TEST 1 GRAPH TITLE</h3>
        <div id="svgcontainerSecondary" />
        <div id="secondaryTooltip" /> 
    </div>
  );
};

export default GraphPage2;