import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('absensi-kkn-auth', 'true');
      localStorage.setItem('absensi-kkn-role', 'admin');
      navigate('/');
      return;
    }

    if (username === 'anggota' && password === 'anggota') {
      localStorage.setItem('absensi-kkn-auth', 'true');
      localStorage.setItem('absensi-kkn-role', 'anggota');
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
