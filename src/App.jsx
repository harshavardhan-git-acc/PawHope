import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Adopt from './pages/Adopt';
import Donate from './pages/Donate';
import Volunteer from './pages/Volunteer';
import Events from './pages/Events';
import Education from './pages/Education';
import Gallery from './pages/Gallery';
import Legal from './pages/Legal';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/events" element={<Events />} />
          <Route path="/education" element={<Education />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<Home />} /> {/* Redirect unknown paths to Home */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
