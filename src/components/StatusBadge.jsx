/**
 * StatusBadge — status koneksi backend (light theme)
 */
export default function StatusBadge({ status }) {
  const map = {
    loading:  { label: 'Menghubungkan...', bg: '#f5f5f5',  color: '#888',    dot: '#bbb' },
    online:   { label: 'Sistem Siap',     bg: '#e8f8e8',  color: '#2d8a2d', dot: '#5bb85b' },
    degraded: { label: 'Sedang Sibuk',     bg: '#fffbeb',  color: '#92400e', dot: '#f59e0b' },
    offline:  { label: 'Sistem Sibuk',  bg: '#fef2f2',  color: '#b91c1c', dot: '#ef4444' },
  };
  const { label, bg, color, dot } = map[status] || map.offline;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      padding: '5px 12px', borderRadius: '99px',
      background: bg, fontSize: '0.78rem', color,
      fontWeight: 600, marginLeft: '0.5rem', flexShrink: 0,
      border: `1px solid ${dot}30`,
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%', background: dot, flexShrink: 0,
        boxShadow: status === 'online' ? `0 0 5px ${dot}` : 'none',
      }} />
      {label}
    </div>
  );
}
