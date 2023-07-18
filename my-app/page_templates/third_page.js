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
          <h1>Topic</h1> {/* [CHANGE #4] - Put title of your page here */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">GROUP TOPIC</h5> {/* [CHANGE #5] - Insert name of your group topic */}
              <p className="card-text">GROUP HYPOTHESIS.</p> {/* [CHANGE #6] - Insert your hypothesis, or anything you deem appropriate here*/}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">TEST 1 TITLE</h5> {/* [CHANGE #7] - Change to title of your first test*/}
                    <div id="svgcontainerPrimary"></div>
                    <div id="primaryTooltip" style={{ position: 'absolute', opacity: '0' }}></div>
                    <Link to="/graph-page1" className="btn btn-link">View Full Graph</Link>

                    <p className="card-text">TEST 1 SHORT SUMMARY.</p> {/* [CHANGE #8] - Short summary of test*/}
                    <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#firstLearnModal">Learn More</button>

                    <div className="modal fade" id="firstLearnModal" tabIndex="-1" role="dialog" aria-labelledby="firstLearnModal" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="firstLearnModal">Example title</h5> {/* [CHANGE #9] - Change name of Modal*/}
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body"> {/* [CHANGE #10] - Write longer description*/}
                            LONG DESCRIPTION
                            ...
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div> {/* [CHANGE #11] - IF YOU DONT WANT LONG DESC, remove from line <div className="modal fade"> up to and including this line*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className = "col-md-4">
            <div className="card">
              <h3 id="group-h3">About our Group</h3> {/* [CHANGE #12] - Change text for whatever you want */}
              <div className="text-center">
                <img src={imageSrc} alt="Image" className="img-fluid" style={{ width: '100px' }} />
              </div>
              <div className="container" id="aboutGroup">
                <ul className="custom-list"> {/* [CHANGE #13] - If you want to keep a list, change the next 3 lines. If you want to remove it, delete lines from <ul> to </ul> and copy the code in Readme  */}
                  <li className="text-left">We think cats are better than dogs</li>
                  <li className="text-left">We worked really hard</li>
                  <li className="text-left">We are good people</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">TEST 2 TITLE</h5> {/* [CHANGE #14] - Write title*/}
                    <div id="svgcontainerSecondary"></div>
                    <div id="secondaryTooltip" style={{ position: 'absolute', opacity: '0' }}></div>
                    <Link to="/graph-page2" className="btn btn-link">View Full Graph</Link>
                    <p className="card-text">TEST 2 SHORT SUMMARY.</p> {/* [CHANGE #15] - Write summary of the graph*/}
                    <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#secondLearnModal">Learn More</button>

                    <div className="modal fade" id="secondLearnModal" tabIndex="-1" role="dialog" aria-labelledby="secondLearnModal" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="secondLearnModal">Modal title</h5> {/* [CHANGE #16] - Change name of the modal title*/}
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body"> {/* [CHANGE #17] - below -> change long description*/}
                            LONG DESCRIPTION
                            ...
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div> {/* [CHANGE #18] - IF YOU DONT WANT LONG DESC, remove from line <div className="modal fade"> up to and including this line*/}
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
