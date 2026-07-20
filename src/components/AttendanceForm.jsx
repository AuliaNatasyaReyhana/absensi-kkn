import { useEffect, useMemo, useState } from 'react';
import { anggotaList } from '../data/anggota';

function AttendanceForm({ onSubmit, defaultName = '' }) {
  const [nama, setNama] = useState(defaultName || '');
  const [status, setStatus] = useState('hadir');
  const [keterangan, setKeterangan] = useState('');
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));

  const today = useMemo(() => new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }), []);

  useEffect(() => {
    if (defaultName) {
      setNama(defaultName);
    }
  }, [defaultName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama) return;

    onSubmit({
      id: crypto.randomUUID(),
      nama,
      status,
      keterangan: status === 'izin' || status === 'sakit' ? keterangan : '',
      tanggal,
      waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    });

    setNama('');
    setStatus('hadir');
    setKeterangan('');
    setTanggal(new Date().toISOString().slice(0, 10));
  };

  return (
    <div className="card">
      <h2>Form Absensi</h2>
      <p>{today}</p>
      <form onSubmit={handleSubmit} className="grid">
        <label>
          Nama anggota
          <select value={nama} onChange={(e) => setNama(e.target.value)} required>
            <option value="">Pilih anggota</option>
            {anggotaList.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <div className="row">
          <label>
            Status
            <select
              value={status}
              onChange={(e) => {
                const nextStatus = e.target.value;
                setStatus(nextStatus);
                if (nextStatus === 'hadir') {
                  setKeterangan('');
                }
              }}
            >
              <option value="hadir">Hadir</option>
              <option value="izin">Izin</option>
              <option value="sakit">Sakit</option>
            </select>
          </label>
          <label>
            Tanggal
            <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
          </label>
        </div>
        {(status === 'izin' || status === 'sakit') && (
          <label>
            Keterangan
            <textarea
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder={status === 'izin' ? 'Tuliskan alasan izin' : 'Tuliskan keterangan sakit'}
              rows="3"
            />
          </label>
        )}
        <button type="submit">Simpan Absensi</button>
      </form>
    </div>
  );
}

export default AttendanceForm;
