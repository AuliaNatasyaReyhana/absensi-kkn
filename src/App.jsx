import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Success from './pages/Success';
import { exportAttendanceToExcel } from './utils/exportExcel';

function App() {
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem('absensi-kkn-records');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('absensi-kkn-records', JSON.stringify(records));
  }, [records]);

  const handleAddRecord = (record) => {
    const nextRecord = {
      ...record,
      keterangan: record.keterangan || '',
    };

    setRecords((prev) => {
      const updated = [nextRecord, ...prev];
      exportAttendanceToExcel(updated);
      return updated;
    });
  };

  const handleDeleteRecord = (id) => {
    setRecords((prev) => prev.filter((item) => item.id !== id));
  };

  const isAuthenticated = () => localStorage.getItem('absensi-kkn-auth') === 'true';

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home records={records} onAddRecord={handleAddRecord} />} />
            <Route path="/admin" element={isAuthenticated() ? <Admin records={records} onDeleteRecord={handleDeleteRecord} /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
