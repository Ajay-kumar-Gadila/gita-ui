import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardGallery from './component/CardGallery';
import SlokaDetail from './component/SlokaDetail';

function App() {
  return (
    <div>
    
    <Router>
      <Routes> {/* Wrap Route components in Routes */}
        <Route path="/" element={<CardGallery />} />
        <Route path="/sloka/:chapterId" element={<SlokaDetail />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
