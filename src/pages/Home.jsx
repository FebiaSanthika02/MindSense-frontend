import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: '🎭', title: 'Deteksi Emosi', desc: 'Identifikasi joy, sadness, anger, fear, dan lebih banyak lagi dari teks kamu.' },
  { icon: '🧠', title: 'Analisis Mental', desc: 'Deteksi stress, anxiety, burnout & depression secara akurat.' },
  { icon: '⚡', title: 'Tingkat Urgensi', desc: 'Penilaian otomatis dari low hingga crisis untuk respons yang tepat.' },
  { icon: '💬', title: 'Respons Suportif', desc: 'Pesan dukungan bilingual yang personal dan empatik.' },
];

const MOOD_OPTIONS = ['😔 Sedih', '😰 Cemas', '😤 Stres', '😊 Bahagia', '🥵 Kelelahan'];

export default function Home() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(160deg, #f0f9f0 0%, #e8f5e8 50%, #f5fbf5 100%)',
        padding: 'clamp(2rem, 5vh, 4rem) 1.5rem clamp(2.5rem, 6vh, 5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 280, height: 280,
          background: 'rgba(91,184,91,0.1)', borderRadius: '50%', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: -40, left: -40, width: 200, height: 200,
          background: 'rgba(91,184,91,0.07)', borderRadius: '50%', pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', alignItems: 'center', gap: 'clamp(1.5rem, 4vw, 3rem)',
          flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'
        }}>
          {/* Text */}
          <div style={{ flex: '1 1 300px', zIndex: 1, maxWidth: '100%' }} className="fade-up">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 1rem', borderRadius: '99px',
              background: 'white', border: '1.5px solid #d4e8d4',
              fontSize: '0.82rem', fontWeight: 600, color: '#3fa33f',
              marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(60,120,60,0.08)',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5bb85b', boxShadow: '0 0 6px #5bb85b', animation: 'pulse 2s infinite' }} />
              Ruang Aman untuk Mentalmu
              <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
            </div>

            <h1 style={{
              fontSize: 'clamp(1.8rem, 7vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.3,
              color: '#1a2e1a',
              marginBottom: '1rem',
              wordBreak: 'break-word',
            }}>
              Take a breath.<br />
              <span style={{ color: '#3fa33f' }}>You're in a safe space.</span>
            </h1>

            <p style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', color: '#5a7a5a',
              maxWidth: 480, lineHeight: 1.6, marginBottom: '1.5rem',
            }}>
              Platform cerdas bilingual untuk memahami emosimu, mengenali kondisi mental,
              dan mendapat dukungan yang kamu butuhkan — kapan saja.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/analyze" className="btn btn-primary" style={{ fontSize: '0.95rem', flex: '1 1 auto', textAlign: 'center' }}>
                Mulai Sekarang
              </Link>
              <Link to="/tips" className="btn btn-outline-green" style={{ fontSize: '0.9rem', flex: '1 1 auto', textAlign: 'center' }}>
                Pelajari Tips →
              </Link>
            </div>

            {/* Quick mood row */}
            <div style={{ marginTop: '2rem' }}>
              <p style={{ fontSize: '0.8rem', color: '#7a9a7a', marginBottom: '0.6rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Bagaimana perasaanmu hari ini?
              </p>
              <div style={{ 
                display: 'flex', gap: '0.5rem', flexWrap: 'nowrap', 
                overflowX: 'auto', paddingBottom: '0.5rem',
                scrollbarWidth: 'none', msOverflowStyle: 'none'
              }}>
                <style>{`.mood-scroll::-webkit-scrollbar { display: none; }`}</style>
                {MOOD_OPTIONS.map(m => (
                  <Link key={m} to="/analyze" style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '99px',
                    background: 'white',
                    border: '1.5px solid #d4e8d4',
                    fontSize: '0.85rem',
                    color: '#3d5a3d',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#5bb85b'; e.currentTarget.style.background = '#f0f9f0'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#d4e8d4'; e.currentTarget.style.background = 'white'; }}
                  >
                    {m}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mascot */}
          <div style={{ flex: '1 1 300px', textAlign: 'center', zIndex: 1, marginTop: '1rem', maxWidth: '100%' }} className="fade-up">
            <img
              src="/mascot.png"
              alt="MindSense mascot"
              className="mascot-float"
              style={{ width: '100%', maxWidth: 220, height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(60,120,60,0.2))', mixBlendMode: 'multiply', margin: '0 auto' }}
            />
            <div style={{
              marginTop: '1rem',
              background: 'white',
              borderRadius: '16px',
              padding: '0.75rem 1.5rem',
              display: 'inline-block',
              boxShadow: '0 4px 16px rgba(60,120,60,0.1)',
              border: '1.5px solid #e8f3e8',
              fontSize: '0.88rem',
              color: '#3d5a3d',
              fontWeight: 500,
              maxWidth: '90%',
            }}>
              💚 Aku di sini untukmu
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────── */}
      <div style={{ background: 'white', borderBottom: '1px solid #e8f3e8', borderTop: '1px solid #e8f3e8' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '1.25rem 1.5rem',
          display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {[['🌏', 'Bilingual', 'Indonesia & English'],
            ['🌱', 'Penuh Empati', 'Analisis Mendalam'],
            ['✨', 'Respons Cepat', 'Hasil Instan'],
            ['🔒', 'Privasi Terjaga', 'Data Tidak Disimpan']
          ].map(([icon, label, sub]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.25rem' }}>{icon}</span>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1a2e1a' }}>{label}</div>
                <div style={{ fontSize: '0.75rem', color: '#7a9a7a' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ─────────────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          <h2 style={{ fontSize: 'clamp(1.15rem, 5vw, 1.75rem)', fontWeight: 800, color: '#1a2e1a', marginBottom: '0.5rem', lineHeight: 1.3 }}>
            Apa yang bisa MindSense lakukan?
          </h2>
          <p style={{ color: '#7a9a7a', fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)', maxWidth: '400px', margin: '0 auto' }}>
            Teknologi cerdas untuk mendukung kesehatan mentalmu
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className="card fade-up" style={{
              animationDelay: `${i * 0.08}s`,
              display: 'flex', flexDirection: 'column', gap: '0.75rem',
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: 'linear-gradient(135deg, #e8f8e8, #d4f0d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '0 4px 12px rgba(60,120,60,0.1)',
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 700, color: '#1a2e1a', fontSize: '1rem' }}>{f.title}</h3>
              <p style={{ color: '#7a9a7a', fontSize: '0.875rem', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ padding: '0 1.5rem clamp(2.5rem, 6vw, 4rem)' }}>
        <div style={{
          maxWidth: 700, margin: '0 auto', textAlign: 'center',
          background: 'linear-gradient(135deg, #1a2e1a, #2d4a2d)',
          borderRadius: 28, padding: 'clamp(2rem, 6vw, 3rem) clamp(1.25rem, 4vw, 2rem)',
          boxShadow: '0 20px 60px rgba(26,46,26,0.25)',
        }}>
          <div style={{ fontSize: 'clamp(2.5rem, 6vw, 3rem)', marginBottom: '1rem' }}>🌱</div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 1.8rem)', fontWeight: 800, color: 'white', marginBottom: '0.75rem', lineHeight: 1.3 }}>
            Mulai perjalanan mentalmu hari ini
          </h2>
          <p style={{ color: '#a8c4a8', marginBottom: '2rem', fontSize: 'clamp(0.85rem, 3vw, 0.95rem)', padding: '0 0.5rem' }}>
            Gratis, bilingual, dan tidak ada data yang disimpan.
          </p>
          <Link to="/analyze" className="btn btn-green" style={{ width: '100%', maxWidth: '280px' }}>
            Coba Sekarang — Gratis
          </Link>
        </div>
      </section>
    </div>
  );
}
