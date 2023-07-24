import React, { useEffect, useState } from 'react';
import { makeGraph1 } from './../graphFirst.js';
import { makeGraph2 } from './../graphSecond.js';
import './../style.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GraphPage1 from './GraphPage1';
import GraphPage2 from './GraphPage2';
import imageSrc from './../teamIMG.png'; // CHANGE #1 - change to route to your teamIMG (for the About Us tab)
import imageGraph from './../graph1.png'; // CHANGE #2 - if you want to add an img to your graph for FIRST TEST, add it as graph1.png
import imageGraph2 from './../graph2.png'; // CHANGE #3 - if you want to add an img to your graph for SECOND TEST, add it as graph2.png


function App() {
  useEffect(() => {
    makeGraph1();
    makeGraph2();
  }, []);

  const [isPaneOpen, setIsPaneOpen] = useState(false); // used for the pane

  const togglePane = () => {
    setIsPaneOpen(!isPaneOpen);
  };

  const paneStyle = {
    height: isPaneOpen ? '500px' : '0',
    transition: 'height 0.3s ease-out',
    overflow: 'hidden',
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-md-12">
          <h1>Topic</h1>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">GROUP TOPIC</h5>
              <p className="card-text">GROUP HYPOTHESIS.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#myPane" onClick={togglePane}>
          Toggle Pane
        </button>
        <div className="collapse" style={paneStyle} id="myPane">
          <div className="d-flex">
            <div className="col-6 d-flex justify-content-end">
              <img src={imageSrc} alt="Image" className="img-fluid" style={{ width: '100px' }} />
            </div>
            <div className="col-6" id="aboutGroup">
              <h3>About our Group</h3>
              <ul className="custom-list">
                <li className="text-left">We think cats are better than dogs</li>
                <li className="text-left">We worked really hard</li>
                <li className="text-left">We are good people</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div>
          <h1>Test 1</h1>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h5 className="card-title">TEST 1 TITLE</h5>
                  <div id="svgcontainerPrimary"></div>
                  <div id="primaryTooltip" style={{ position: 'absolute', opacity: '0' }}></div>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <p className="card-text">TEST 1 SHORT SUMMARY.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1>Test 2</h1>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h5 className="card-title">TEST 2 TITLE</h5>
                  <div id="svgcontainerSecondary"></div>
                  <div id="secondaryTooltip" style={{ position: 'absolute', opacity: '0' }}></div>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <p className="card-text">TEST 2 SHORT SUMMARY.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/graph-page1" element={<GraphPage1 />} />
        <Route path="/graph-page2" element={<GraphPage2 />} />
      </Routes>
    </div>
  );
}

export default App;
