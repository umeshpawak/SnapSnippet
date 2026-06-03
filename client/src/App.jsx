import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ViewSnippet from './pages/ViewSnippet';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/snippet/:id" element={<ViewSnippet />} />
      </Routes>
    </Router>
  );
}

export default App;
