function AttendanceTable({ records, onDelete }) {
  if (!records.length) {
    return <div className="card empty-state">Belum ada data absensi.</div>;
  }

  return (
    <div className="card">
      <h2>Daftar Absensi</h2>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Status</th>
            <th>Keterangan</th>
            <th>Tanggal</th>
            <th>Waktu</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item) => (
            <tr key={item.id}>
              <td>{item.nama}</td>
              <td><span className={`status ${item.status}`}>{item.status}</span></td>
              <td>{item.keterangan || '-'}</td>
              <td>{item.tanggal}</td>
              <td>{item.waktu}</td>
              <td>
                <button className="danger" onClick={() => onDelete(item.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
