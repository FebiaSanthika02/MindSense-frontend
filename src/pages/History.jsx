import { useState, useEffect } from 'react';

const EMOTION_EMOJI   = { joy:'😊', sadness:'😢', anger:'😠', fear:'😨', disgust:'🤢', surprise:'😲', neutral:'😐' };
const URGENCY_COLORS  = { crisis:'#ef4444', high:'#f97316', medium:'#d97706', low:'#3fa33f' };
const URGENCY_BG      = { crisis:'#fef2f2', high:'#fff8f0', medium:'#fffbeb', low:'#f0f9f0' };

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem('ms_history') || '[]'));
  }, []);

  const clearAll = () => {
    if (window.confirm('Hapus semua riwayat?')) {
      localStorage.removeItem('ms_history');
      setHistory([]);
    }
  };

  if (history.length === 0) {
    return (
      <div className="container-sm" style={{ textAlign: 'center', paddingTop: '5rem' }}>
        <img src="/mascot.png" alt="mascot" style={{ width: 140, marginBottom: '1.25rem', filter: 'drop-shadow(0 8px 20px rgba(60,120,60,0.15))' }} />
        <h2 style={{ fontWeight: 800, color: '#1a2e1a', marginBottom: '0.5rem' }}>Belum ada riwayat</h2>
        <p style={{ color: '#7a9a7a', fontSize: '0.9rem' }}>Hasil analisis akan otomatis tersimpan di sini.</p>
      </div>
    );
  }

  return (
    <div className="container-sm">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1.5rem' }}>
        <div>
          <h1 className="section-title">Riwayat Analisis 📋</h1>
          <p className="section-sub" style={{ marginBottom: 0 }}>{history.length} entri tersimpan di browser</p>
        </div>
        <button
          className="btn btn-ghost"
          onClick={clearAll}
          style={{ color: '#ef4444', borderColor: '#fca5a5', fontSize: '0.85rem' }}
        >
          Hapus Semua
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {history.map((item, i) => (
          <div
            key={i}
            className="card fade-up"
            style={{
              animationDelay: `${i * 0.04}s`,
              background: URGENCY_BG[item.urgency] || 'white',
              borderColor: `${URGENCY_COLORS[item.urgency] || '#d4e8d4'}30`,
            }}
          >
            {/* Quote */}
            <p style={{ fontSize: '0.9rem', color: '#3d5a3d', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              "{item.text.length > 130 ? item.text.slice(0, 130) + '…' : item.text}"
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', padding: '3px 10px', borderRadius: '99px', background: '#e8f8e8', color: '#2d8a2d', fontWeight: 600 }}>
                {EMOTION_EMOJI[item.emotion]} {item.emotion}
              </span>
              <span style={{ fontSize: '0.78rem', padding: '3px 10px', borderRadius: '99px', background: '#f0f9f0', color: '#2d8a2d', fontWeight: 600 }}>
                🧠 {item.mental_state}
              </span>
              <span style={{
                fontSize: '0.78rem', padding: '3px 10px', borderRadius: '99px',
                background: URGENCY_BG[item.urgency] || '#f0f9f0',
                color: URGENCY_COLORS[item.urgency] || '#3fa33f',
                fontWeight: 600, border: `1px solid ${URGENCY_COLORS[item.urgency] || '#d4e8d4'}40`,
              }}>
                ⚡ {item.urgency}
              </span>
            </div>

            <p style={{ fontSize: '0.73rem', color: '#a8c4a8' }}>
              {new Date(item.timestamp).toLocaleString('id-ID')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
