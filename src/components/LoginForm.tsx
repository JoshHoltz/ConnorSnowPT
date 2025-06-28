import { useState } from 'react';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submit reload

    setError('');

    try {
      const res = await fetch('https://connorsnowpt.onrender.com/api/login-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_username: username,
          user_password: password,
        }),
      });

      if (res.ok) {
        window.location.href = 'http://localhost:5173/client/home';
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
        <section className="text-black py-20 md:mt-20 bg-gray-100 h-screen">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
    <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
      <input
        type="text"
        name="user_username"
        placeholder="Enter your username"
        className="text-black w-full p-2 mt-4 border border-blue-600 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        name="user_password"
        placeholder="Enter your password"
        className="text-black w-full p-2 mt-4 border border-blue-600 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 w-full"
      >
        Login
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
    </div>
    </section>
  );
}