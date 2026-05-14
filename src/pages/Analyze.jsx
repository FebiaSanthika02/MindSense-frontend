import { useState } from 'react';
import ResultCard from '../components/ResultCard';
import api from '../hooks/useApi';

const EMOTION_EMOJI = { joy:'😊', sadness:'😢', anger:'😠', fear:'😨', disgust:'🤢', surprise:'😲', neutral:'😐' };
const MENTAL_EMOJI  = { stress:'😤', anxiety:'😰', burnout:'🥵', depression:'😞', loneliness:'🥺', normal:'✨' };

const MOOD_CHIPS = [
  { label: '😰 Cemas / Anxious',   text: 'Saya merasa sangat cemas dan khawatir tentang banyak hal. Tidak bisa berhenti memikirkannya.' },
  { label: '😤 Stres Kerja',        text: 'Pekerjaan sangat menekan akhir-akhir ini. Saya merasa overwhelmed dan tidak tahu harus mulai dari mana.' },
  { label: '😞 Merasa Sedih',       text: 'Saya merasa sangat sedih dan tidak tahu kenapa. Rasanya hampa dan tidak bersemangat.' },
  { label: '🥵 Kelelahan',          text: 'Saya sudah sangat kelelahan, burnout. Tidak ada energi sama sekali meskipun sudah istirahat.' },
  { label: '😊 Baik-Baik Saja',    text: 'Hari ini cukup baik. Saya merasa lebih tenang dan bersyukur.' },
];

export default function Analyze({ apiStatus }) {
  const [text, setText]       = useState('');
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleAnalyze = async () => {
    if (text.trim().length < 3) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await api.analyze(text.trim());
      setResult(data);
      const history = JSON.parse(localStorage.getItem('ms_history') || '[]');
      history.unshift({ ...data, timestamp: new Date().toISOString() });
      localStorage.setItem('ms_history', JSON.stringify(history.slice(0, 50)));
    } catch (err) {
      setError(`Gagal: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!result) return;
    const txt = `MindSense — Hasil Analisis\n${'='.repeat(40)}\n`
      + `Waktu: ${new Date().toLocaleString('id-ID')}\n\n`
      + `INPUT:\n${result.text}\n\n`
      + `HASIL:\n`
      + `- Emosi: ${result.emotion} (${Math.round(result.emotion_confidence*100)}%)\n`
      + `- Kondisi: ${result.mental_state} (${Math.round(result.mental_confidence*100)}%)\n`
      + `- Urgensi: ${result.urgency} (${Math.round(result.urgency_confidence*100)}%)\n\n`
      + `RESPONS:\n${result.supportive_response}\n\n`
      + `SARAN:\n${result.coping_suggestions.map(s=>'• '+s).join('\n')}\n\n`
      + `JOURNALING:\n${result.journaling_prompt}`;
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([txt], { type: 'text/plain' })),
      download: `mindsense-${new Date().toISOString().split('T')[0]}.txt`,
    });
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="container-sm">

      {/* ── Page header ─────────────────────────────── */}
      <div style={{ textAlign: 'center', padding: '2rem 0 1.5rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌿</div>
        <h1 className="section-title">Ceritakan Perasaanmu</h1>
        <p className="section-sub">
          Tulis apa yang kamu rasakan — dalam Bahasa Indonesia atau Inggris.
        </p>
      </div>

      {/* ── Mood chips ──────────────────────────────── */}
      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7a9a7a', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.6rem' }}>
          Pilih suasana hati:
        </p>
        <div className="mood-chips">
          {MOOD_CHIPS.map(m => (
            <button
              key={m.label}
              className={`mood-chip ${text === m.text ? 'selected' : ''}`}
              onClick={() => setText(m.text)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Input card ──────────────────────────────── */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#5a7a5a', marginBottom: '0.6rem' }}>
          ✍️ Tulis perasaanmu:
        </label>
        <textarea
          rows={5}
          placeholder="Contoh: Saya merasa sangat lelah dan stres akhir-akhir ini, seperti tidak ada waktu untuk diri sendiri..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.ctrlKey && e.key === 'Enter' && handleAnalyze()}
          maxLength={5000}
        />
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: '1rem', flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <span style={{ fontSize: '0.78rem', color: '#a8c4a8' }}>
            {text.length}/5000 karakter · <kbd style={{ background: '#f0f9f0', padding: '1px 5px', borderRadius: 4, border: '1px solid #d4e8d4', fontSize: '0.75rem' }}>Ctrl+Enter</kbd> untuk analisis
          </span>
          <button
            className="btn btn-primary"
            onClick={handleAnalyze}
            disabled={loading || text.trim().length < 3 || apiStatus === 'offline'}
            style={{ padding: '0.7rem 1.75rem' }}
          >
            {loading
              ? <><span className="spinner" /> Menganalisis...</>
              : '🔍 Analisis Sekarang'}
          </button>
        </div>
      </div>

      {/* ── API offline warning ──────────────────────── */}
      {apiStatus === 'offline' && (
        <div className="card card-sm" style={{ borderColor: '#fca5a5', background: '#fef2f2', color: '#b91c1c', marginBottom: '1rem', fontSize: '0.88rem' }}>
          ⚠️ Sistem sedang mengalami gangguan. Mohon coba beberapa saat lagi.
        </div>
      )}

      {/* ── Error ───────────────────────────────────── */}
      {error && (
        <div className="card card-sm" style={{ borderColor: '#fca5a5', background: '#fef2f2', color: '#b91c1c', marginBottom: '1rem', fontSize: '0.88rem' }}>
          ❌ {error}
        </div>
      )}

      {/* ── Results ─────────────────────────────────── */}
      {result && (
        <div className="fade-up">

          {/* Metric cards */}
          <div className="metrics-grid" style={{ marginBottom: '1.25rem' }}>
            <ResultCard
              label="🎭 Emosi"
              value={result.emotion}
              confidence={result.emotion_confidence}
              emoji={EMOTION_EMOJI[result.emotion]}
            />
            <ResultCard
              label="🧠 Kondisi Mental"
              value={result.mental_state}
              confidence={result.mental_confidence}
              emoji={MENTAL_EMOJI[result.mental_state]}
            />
            <ResultCard
              label="⚡ Urgensi"
              value={result.urgency}
              confidence={result.urgency_confidence}
              urgency
            />
          </div>

          {/* Crisis banner */}
          {result.urgency === 'crisis' && (
            <div className="crisis-alert" style={{ marginBottom: '1.25rem' }}>
              ⚠️ <strong>Butuh bantuan segera?</strong><br />
              Hubungi <strong>Hotline 119 ext 8</strong> (Indonesia, 24 jam gratis) atau{' '}
              <strong>Into The Light: 021-7884-5555</strong>. Kamu tidak sendirian 💙
            </div>
          )}

          {/* Supportive response */}
          <div className="card card-green" style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 700, color: '#2d8a2d', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>💬</span> Respons Suportif
            </h3>
            {result.supportive_response.split('\n').filter(l => l.trim()).map((line, i) => (
              <p key={i} style={{ marginBottom: '0.5rem', lineHeight: 1.75, color: '#3d5a3d' }}>{line}</p>
            ))}
          </div>

          {/* Coping suggestions */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 700, color: '#1a2e1a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>🛠️</span> Saran Coping
            </h3>
            <ul className="suggestions-list">
              {result.coping_suggestions.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          {/* Journaling prompt */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, color: '#1a2e1a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>📓</span> Journaling Prompt
            </h3>
            <p style={{
              color: '#5a7a5a', fontStyle: 'italic', lineHeight: 1.75,
              padding: '0.75rem 1rem', background: '#f0f9f0',
              borderRadius: 10, borderLeft: '3px solid #5bb85b',
            }}>
              {result.journaling_prompt}
            </p>
          </div>

          <button className="btn btn-ghost" onClick={handleExport}>
            ⬇ Unduh Hasil Analisis
          </button>
        </div>
      )}
    </div>
  );
}
