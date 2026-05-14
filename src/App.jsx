import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import History from './pages/History';
import Tips from './pages/Tips';
import StatusBadge from './components/StatusBadge';
import api from './hooks/useApi';
import './App.css';

function Navbar({ apiStatus }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand" onClick={() => setMenuOpen(false)}>
        <img src="/logo.png" alt="MindSense logo" style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'cover', mixBlendMode: 'multiply' }} />
        <span>MindSense</span>
      </Link>

      <button
        className="nav-toggle"
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>Beranda</NavLink>
        <NavLink to="/analyze" onClick={() => setMenuOpen(false)}>Analisis</NavLink>
        <NavLink to="/history" onClick={() => setMenuOpen(false)}>Riwayat</NavLink>
        <NavLink to="/tips" onClick={() => setMenuOpen(false)}>Tips</NavLink>
      </div>

      <StatusBadge status={apiStatus} />
    </nav>
  );
}

export default function App() {
  const [apiStatus, setApiStatus] = useState('loading');

  useEffect(() => {
    const check = async () => {
      try {
        const data = await api.checkHealth();
        setApiStatus(data.status === 'healthy' ? 'online' : 'degraded');
      } catch {
        setApiStatus('offline');
      }
    };
    check();
    const id = setInterval(check, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar apiStatus={apiStatus} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analyze apiStatus={apiStatus} />} />
            <Route path="/history" element={<History />} />
            <Route path="/tips" element={<Tips />} />
          </Routes>
        </main>
        <footer className="footer" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
          <span>© 2026 MindSense</span>
          <span className="footer-separator">·</span>
          <span>Butuh bantuan? Hubungi <strong>119</strong> (24 jam)</span>
        </footer>
      </div>
    </BrowserRouter>
  );
}
