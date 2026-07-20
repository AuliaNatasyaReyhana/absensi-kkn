import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { anggotaList } from '../data/anggota';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const normalizedUsername = username.trim();
    const memberMatch = anggotaList.find((item) => item.toLowerCase() === normalizedUsername.toLowerCase());

    if (normalizedUsername === 'admin' && password === 'admin') {
      localStorage.setItem('absensi-kkn-auth', 'true');
      localStorage.setItem('absensi-kkn-role', 'admin');
      localStorage.setItem('absensi-kkn-username', normalizedUsername);
      navigate('/');
      return;
    }

    if (password === 'anggota' && (normalizedUsername === 'anggota' || Boolean(memberMatch))) {
      const memberName = memberMatch || normalizedUsername;
      localStorage.setItem('absensi-kkn-auth', 'true');
      localStorage.setItem('absensi-kkn-role', 'anggota');
      localStorage.setItem('absensi-kkn-username', memberName);
      navigate('/');
      return;
    }

    setError('Username atau password salah.');
  };

  return (
    <div className="card" style={{ maxWidth: '460px', margin: '40px auto' }}>
      <h1>Login</h1>
      <p style={{ marginTop: '-8px', color: '#64748b' }}>Gunakan akun admin atau anggota</p>
      <form onSubmit={handleLogin} className="grid">
        <label>
          Username
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        </label>
        {error ? <p style={{ color: '#dc2626', margin: 0 }}>{error}</p> : null}
        <button type="submit">Masuk</button>
      </form>
    </div>
  );
}

export default Login;
