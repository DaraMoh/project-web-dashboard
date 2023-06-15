import React, { useEffect } from 'react';
import './../App.css';
import { makeGraph1 } from './../graphFirst.js';
import { makeGraph2 } from './../graphSecond.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GraphPage from './GraphPage';


function App() {
  useEffect(() => {
    makeGraph1();
    makeGraph2();
  }, []);

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
      <div className="row">
        <div className="col-md-6">
          <h1>Test 1</h1>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">TEST 1 TITLE</h5>
              {/* INSERT GRAPH HEREEEEEEEEEEEEEEEEEEEEEEEE */}
              <div id="svgcontainerPrimary"></div>
              <div id="primaryTooltip" style={{ position: 'absolute', opacity: '0' }}></div>
              <Link to="/graph-page" className="btn btn-link">View Full Graph</Link>
              <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#firstExpand">Learn More</button>

              <p className="card-text">TEST 1 SHORT SUMMARY.</p>
              <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#firstLearnModal">Learn More</button>

              <div className="modal fade" id="firstLearnModal" tabIndex="-1" role="dialog" aria-labelledby="firstLearnModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="firstLearnModal">Modal title</h5>
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
        <div className="col-md-6">
          <h1>Test 2</h1>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">TEST 2 TITLE</h5>
              {/* INSERT GRAPH HEREEEEEEEEEEEEEEEEEEEEEEEE */}
              <div id="svgcontainerSecondary"></div>
              <div id="secondaryTooltip" style={{ position: 'absolute', opacity: '0' }}></div>
              <Link to="/graph-page" className="btn btn-link">View Full Graph</Link>
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
      <Routes>
      <Route path="/graph-page" element={<GraphPage />} />
    </Routes>
    </div>
  );
}

export default App;
