import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components/pages
import HomePage from './Pages/HomePage';
import GraphPage from './Pages/GraphPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/graph-page" element={<GraphPage />} />
        {/* Add more routes here for other pages */}
      </Routes>
    </Router>
  );
}

export default App;
