import React, { useEffect, useState } from 'react';
import { makeGraph1 } from './../graphFirst.js';
import { makeGraph2 } from './../graphSecond.js';
import './../style.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GraphPage1 from './GraphPage1';
import GraphPage2 from './GraphPage2';
import imageSrc from './../pineapple.png';

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
        <div className="row">
          <div className = "col-md-6">
            <div className="card">
              <h3 id="group-h3">About our Group</h3>
              <div className="text-center">
                <img src={imageSrc} alt="Image" className="img-fluid" style={{ width: '100px' }} />
              </div>
              <div className="container" id="aboutGroup">
                <ul className="custom-list">
                  <li className="text-left">We think cats are better than dogs</li>
                  <li className="text-left">We worked really hard</li>
                  <li className="text-left">We are good people</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">TEST 1 TITLE</h5>
                    {/* INSERT GRAPH HEREEEEEEEEEEEEEEEEEEEEEEEE */}
                    <div id="svgcontainerPrimary"></div>
                    <div id="primaryTooltip" style={{ position: 'absolute', opacity: '0' }}></div>
                    <Link to="/graph-page1" className="btn btn-link">View Full Graph</Link>

                    <p className="card-text">TEST 1 SHORT SUMMARY.</p>
                    <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#firstLearnModal">Learn More</button>

                    <div className="modal fade" id="firstLearnModal" tabIndex="-1" role="dialog" aria-labelledby="firstLearnModal" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="firstLearnModal">James' Modal title</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            LONG DESCRIPTION
                            ...
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">TEST 2 TITLE</h5>
                    {/* INSERT GRAPH HEREEEEEEEEEEEEEEEEEEEEEEEE */}
                    <div id="svgcontainerSecondary"></div>
                    <div id="secondaryTooltip" style={{ position: 'absolute', opacity: '0' }}></div>
                    <Link to="/graph-page2" className="btn btn-link">View Full Graph</Link>
                    {/*} <button id="startButton">Start Animation</button> --     DOES NOT WORK, ASSOCIATED WITH FORCE DIRECTED GRAPH*/}
                    <p className="card-text">TEST 2 SHORT SUMMARY.</p>
                    <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#secondLearnModal">Learn More</button>

                    <div className="modal fade" id="secondLearnModal" tabIndex="-1" role="dialog" aria-labelledby="secondLearnModal" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="secondLearnModal">Modal title</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            LONG DESCRIPTION
                            ...
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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