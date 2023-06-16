import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components/pages
import HomePage from './Pages/HomePage';
import GraphPage1 from './Pages/GraphPage1';
import GraphPage2 from './Pages/GraphPage2';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/graph-page1" element={<GraphPage1 />} />
        <Route path="/graph-page2" element={<GraphPage2 />} />
        {/* Add more routes here for other pages */}
      </Routes>
    </Router>
  );
}

export default App;
