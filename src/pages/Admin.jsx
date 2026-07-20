import AttendanceTable from '../components/AttendanceTable';
import { exportAttendanceToExcel } from '../utils/exportExcel';

function Admin({ records, onDeleteRecord }) {
  const handleExport = () => {
    exportAttendanceToExcel(records);
  };

  return (
    <div className="grid">
      <div className="card">
        <h1>Halaman Admin</h1>
        <p>Kelola data absensi KKN.</p>
        <button onClick={handleExport} style={{ marginTop: '12px' }}>Export Excel</button>
      </div>
      <AttendanceTable records={records} onDelete={onDeleteRecord} />
    </div>
  );
}

export default Admin;
