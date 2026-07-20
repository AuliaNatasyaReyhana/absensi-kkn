import { useLocation, useNavigate } from 'react-router-dom';

function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const record = location.state?.record;

  return (
    <div className="card" style={{ maxWidth: '560px', margin: '40px auto', textAlign: 'center' }}>
      <h1>Absensi Berhasil</h1>
      {record ? (
        <>
          <p><strong>Nama:</strong> {record.nama}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <p><strong>Tanggal:</strong> {record.tanggal}</p>
          <p><strong>Lokasi:</strong> {record.lokasi}</p>
          <p><strong>Waktu:</strong> {record.waktu}</p>
        </>
      ) : (
        <p>Data absensi tidak tersedia.</p>
      )}
      <button onClick={() => navigate('/')}>Kembali ke Home</button>
    </div>
  );
}

export default Success;
