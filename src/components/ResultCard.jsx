/**
 * ResultCard — metric card untuk light theme
 */
export default function ResultCard({ label, value, confidence, urgency }) {
  const pct = Math.round((confidence || 0) * 100);

  const urgencyColors = {
    crisis: '#ef4444', high: '#f97316', medium: '#d97706', low: '#3fa33f',
  };
  const valColor = urgency
    ? (urgencyColors[value] || '#3fa33f')
    : '#3fa33f';

  const urgencyBg = urgency ? {
    crisis: '#fff5f5', high: '#fff8f0', medium: '#fffbeb', low: '#f0f9f0',
  }[value] || '#f0f9f0' : '#f0f9f0';

  return (
    <div className={`card metric-card ${urgency ? `urgency-${value}` : ''}`}
      style={{ background: urgencyBg }}>
      <div className="metric-label">{label}</div>
      <div className="metric-value" style={{ color: valColor, fontSize: '1.25rem' }}>
        {value ? value.charAt(0).toUpperCase() + value.slice(1) : '—'}
      </div>
      <div className="metric-conf">{pct}% confidence</div>
      <div className="progress-track" style={{ marginTop: '0.6rem' }}>
        <div className="progress-fill"
          style={{ width: `${pct}%`, background: urgency ? valColor : undefined }} />
      </div>
    </div>
  );
}
