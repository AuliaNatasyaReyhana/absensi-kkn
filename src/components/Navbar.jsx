import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem('absensi-kkn-role');
  const isLoggedIn = localStorage.getItem('absensi-kkn-auth') === 'true';
  const isAdmin = role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('absensi-kkn-auth');
    localStorage.removeItem('absensi-kkn-role');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="brand">Absensi KKN</div>
      <nav>
        <Link to="/">Home</Link>
        {isAdmin ? <Link to="/admin">Admin</Link> : null}
        {isLoggedIn && !isAdmin ? <Link to="/riwayat">Riwayat</Link> : null}
        {isLoggedIn ? (
          <span style={{ color: '#e2e8f0', fontWeight: 600 }}>
            {isAdmin ? 'Admin' : 'Anggota'}
          </span>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="danger" style={{ padding: '6px 10px' }}>
            Logout
          </button>
        ) : null}
      </nav>
    </header>
  );
}

export default Navbar;
