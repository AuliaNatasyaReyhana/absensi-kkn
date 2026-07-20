import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AttendanceForm from '../components/AttendanceForm';
import QRScanner from '../components/QRScanner';
import { anggotaList } from '../data/anggota';

function Home({ records, onAddRecord }) {
  const navigate = useNavigate();
  const [selectedName, setSelectedName] = useState('');
  const storedUsername = localStorage.getItem('absensi-kkn-username') || '';
  const currentUserName = localStorage.getItem('absensi-kkn-role') === 'anggota'
    ? anggotaList.find((item) => item.toLowerCase() === storedUsername.toLowerCase()) || storedUsername
    : '';

  const barcodeBars = Array.from({ length: 40 }, (_, index) => {
    const width = index % 5 === 0 ? 8 : index % 3 === 0 ? 5 : 3;
    const color = index % 2 === 0 ? '#0f172a' : '#2563eb';

    return (
      <rect
        key={index}
        x={8 + index * 3}
        y="8"
        width={width}
        height="90"
        rx="1"
        fill={color}
      />
    );
  });

  const handleScan = (result) => {
    const member = anggotaList.find((item) => item.toLowerCase() === result.toLowerCase());
    if (member) {
      setSelectedName(member);
      const record = {
        id: crypto.randomUUID(),
        nama: member,
        status: 'hadir',
        keterangan: '',
        tanggal: new Date().toISOString().slice(0, 10),
        waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      onAddRecord(record);
      navigate('/success', { state: { record } });
    } else {
      alert('Nama anggota tidak ditemukan.');
    }
  };

  return (
    <div className="grid">
      <section className="hero">
        <div>
          <div className="hero-brand">
            <div>
              <h1>Absensi KKN Bina Baru</h1>
              <p>Scan barcode anggota, lalu sistem akan mencatat nama, status, tanggal, waktu, dan keterangan jika diperlukan.</p>
            </div>
          </div>
        </div>
        <div className="card">
          <h3>Barcode anggota</h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <svg viewBox="0 0 140 110" style={{ width: '100%', maxWidth: '260px', height: 'auto' }}>
              <rect x="4" y="4" width="132" height="102" rx="8" fill="#f8fafc" stroke="#cbd5e1" />
              <rect x="16" y="16" width="12" height="78" rx="2" fill="#0f172a" />
              <rect x="34" y="16" width="6" height="78" rx="2" fill="#2563eb" />
              <rect x="48" y="16" width="10" height="78" rx="2" fill="#0f172a" />
              <rect x="66" y="16" width="4" height="78" rx="2" fill="#2563eb" />
              <rect x="78" y="16" width="8" height="78" rx="2" fill="#0f172a" />
              <rect x="94" y="16" width="5" height="78" rx="2" fill="#2563eb" />
              <rect x="108" y="16" width="12" height="78" rx="2" fill="#0f172a" />
              {barcodeBars}
            </svg>
            <p style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>KKN-ABSENSI-2026</p>
            <p style={{ margin: 0, textAlign: 'center', color: '#475569' }}>Barcode ini tampil otomatis di halaman home.</p>
          </div>
          <hr style={{ margin: '1rem 0', borderColor: '#e2e8f0' }} />
          <h3>Scan QR anggota</h3>
          <QRScanner onScan={handleScan} disabled={false} />
          {selectedName && <p>Terdeteksi: <strong>{selectedName}</strong></p>}
        </div>
      </section>

      <AttendanceForm onSubmit={onAddRecord} defaultName={currentUserName} />
      <div className="card">
        <h3>Catatan saat ini</h3>
        <p>Jumlah absensi: {records.length}</p>
      </div>
    </div>
  );
}

export default Home;
