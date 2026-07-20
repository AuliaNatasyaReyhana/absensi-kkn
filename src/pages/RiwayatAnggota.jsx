function RiwayatAnggota({ records }) {
  const role = localStorage.getItem('absensi-kkn-role');
  const username = localStorage.getItem('absensi-kkn-username') || 'anggota';
  const memberName = localStorage.getItem('absensi-kkn-member-name') || username;

  const myRecords = records.filter((item) => {
    const recordName = item.nama?.trim().toLowerCase();
    const loginName = username?.trim().toLowerCase();
    const sessionMemberName = memberName?.trim().toLowerCase();

    if (role === 'admin') {
      return true;
    }

    return (
      recordName === loginName ||
      recordName === sessionMemberName ||
      recordName === 'anggota' ||
      recordName === 'admin'
    );
  });

  return (
    <div className="grid">
      <div className="card">
        <h1>Riwayat Absensi</h1>
        <p>Catatan absensi Anda sebagai anggota.</p>
      </div>

      <div className="card">
        {myRecords.length === 0 ? (
          <p>Belum ada riwayat absensi untuk akun Anda.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Status</th>
                <th>Keterangan</th>
                <th>Tanggal</th>
                <th>Waktu</th>
              </tr>
            </thead>
            <tbody>
              {myRecords.map((item) => (
                <tr key={item.id}>
                  <td>{item.nama}</td>
                  <td><span className={`status ${item.status}`}>{item.status}</span></td>
                  <td>{item.keterangan || '-'}</td>
                  <td>{item.tanggal}</td>
                  <td>{item.waktu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RiwayatAnggota;
