const TIPS = [
  { icon:'🧘', title:'Teknik Pernapasan 4-7-8', desc:'Hirup 4 detik, tahan 7 detik, hembuskan 8 detik. Ulangi 4x untuk menenangkan sistem saraf.', tag:'Anxiety', tagColor:'#f97316', tagBg:'#fff8f0' },
  { icon:'📓', title:'Journaling Harian',        desc:'Tulis 3 hal yang kamu syukuri setiap pagi. Melatih otak fokus pada hal positif.',             tag:'Depresi',  tagColor:'#8b5cf6', tagBg:'#f5f3ff' },
  { icon:'🚶', title:'Jalan Kaki 10 Menit',      desc:'Gerakan fisik ringan melepas endorfin alami. Cukup 10 menit di luar ruangan.',               tag:'Stress',   tagColor:'#d97706', tagBg:'#fffbeb' },
  { icon:'📵', title:'Digital Detox 1 Jam',      desc:'Satu jam bebas layar sebelum tidur meningkatkan kualitas tidur secara signifikan.',          tag:'Anxiety',  tagColor:'#f97316', tagBg:'#fff8f0' },
  { icon:'👥', title:'Hubungi Satu Orang',       desc:'Kirim pesan sederhana ke orang yang kamu percaya. Koneksi sosial melindungi dari depresi.',  tag:'Loneliness',tagColor:'#3b82f6',tagBg:'#eff6ff' },
  { icon:'⏸️', title:'Jeda 90 Menit',           desc:'Otak butuh istirahat setiap 90 menit. Jadwalkan jeda singkat untuk cegah burnout.',         tag:'Burnout',  tagColor:'#ef4444', tagBg:'#fef2f2' },
  { icon:'🌞', title:'Sinar Matahari Pagi',      desc:'Sinar matahari pagi memicu serotonin. Targetkan 15-30 menit dalam 1 jam setelah bangun.',   tag:'Depresi',  tagColor:'#8b5cf6', tagBg:'#f5f3ff' },
  { icon:'🛡️', title:'Tetapkan Batasan',         desc:'Belajar berkata "tidak" adalah skill self-care. Batasan yang sehat melindungi energi mental.',tag:'Burnout',  tagColor:'#ef4444', tagBg:'#fef2f2' },
];

export default function Tips() {
  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #f0f9f0, #e8f5e8)',
        padding: '3rem 1.5rem 2.5rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2.75rem', marginBottom: '0.75rem' }}>💚</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a2e1a', marginBottom: '0.5rem' }}>
          Tips Kesehatan Mental
        </h1>
        <p style={{ color: '#7a9a7a', maxWidth: 480, margin: '0 auto', fontSize: '0.95rem' }}>
          Teknik berbasis ilmu pengetahuan untuk menjaga kesejahteraan mentalmu sehari-hari.
        </p>
      </div>

      {/* Grid */}
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}>
          {TIPS.map((tip, i) => (
            <div
              key={tip.title}
              className="card fade-up"
              style={{ animationDelay: `${i * 0.06}s`, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: tip.tagBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem',
              }}>
                {tip.icon}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <h3 style={{ fontWeight: 700, color: '#1a2e1a', fontSize: '0.95rem', flex: 1 }}>{tip.title}</h3>
                <span style={{
                  fontSize: '0.7rem', padding: '2px 8px', borderRadius: '99px',
                  background: tip.tagBg, color: tip.tagColor, fontWeight: 700, flexShrink: 0,
                }}>
                  {tip.tag}
                </span>
              </div>
              <p style={{ color: '#7a9a7a', fontSize: '0.858rem', lineHeight: 1.65, flex: 1 }}>{tip.desc}</p>
            </div>
          ))}
        </div>

        {/* Emergency card */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, #1a2e1a, #2d4a2d)',
          border: 'none',
          color: 'white',
        }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontWeight: 800, color: '#a8d4a8', marginBottom: '0.5rem', fontSize: 'clamp(1.1rem, 5vw, 1.4rem)' }}>Butuh Bantuan Segera?</h3>
              <p style={{ color: '#7aaa7a', fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)', lineHeight: 1.8, wordBreak: 'break-word' }}>
                <strong style={{ color: '#c8e8c8' }}>Hotline Kesehatan Jiwa: 119 ext 8</strong> <span style={{ whiteSpace: 'nowrap' }}>— 24 jam, gratis</span><br />
                <strong style={{ color: '#c8e8c8' }}>Into The Light: 021-7884-5555</strong><br />
                <strong style={{ color: '#c8e8c8' }}>Yayasan Pulih: 021-788-42580</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
