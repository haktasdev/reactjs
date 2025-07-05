import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './Home';
import Companies from './Companies';
import CompanyDetail from './CompanyDetail';

function App() {
  return (
    <Router>
      <nav style={{ padding: 10, backgroundColor: '#eee' }}>
        <Link to="/" style={{ marginRight: 15 }}>Anasayfa</Link>
        <Link to="/companies">Şirketler</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<CompanyDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
