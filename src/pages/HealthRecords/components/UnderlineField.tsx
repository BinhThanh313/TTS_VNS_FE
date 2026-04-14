export const UnderlineField = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ color: '#8c8c8c', fontSize: 13, marginBottom: 4 }}>{label}</div>
    <div style={{ borderBottom: '1px solid #d9d9d9', paddingBottom: 6, fontWeight: 500, color: '#333', fontSize: 14 }}>
      {value}
    </div>
  </div>
);