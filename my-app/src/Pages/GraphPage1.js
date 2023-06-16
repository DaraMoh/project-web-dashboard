import React, { useEffect } from 'react';
import { makeGraph1 } from '../graphFirst';
import './GraphPagePri.css'; // Import the CSS file

const GraphPage = () => {
  useEffect(() => {
    makeGraph1(); // Call the makeGraph2 function to render the graph
  }, []);
  return (
    <div class = "graph-page">
        <h1>TEST 1 PAGE TITLE</h1>
        <h3>TEST 1 GRAPH TITLE</h3>
        <div id="svgcontainerPrimary" />
        <div id="primaryTooltip" /> 
    </div>
  );
};

export default GraphPage;