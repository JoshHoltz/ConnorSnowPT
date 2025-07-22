import { useState } from 'react';
import { useNavigate } from "react-router-dom";

// REF (Logging In and Session Tokens): https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

async function loginUser(credentials) {
  return fetch('https://connorsnowpt.onrender.com/api/login-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then(data => data.json());
}

export default function LoginForm() {

  const setToken = ({ user_id, user_username }) => {
    sessionStorage.setItem('user_id', user_id);
    sessionStorage.setItem('user_username', user_username);
  };


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      user_username: username,
      user_password: password,
    });

    if (token) {
      setToken(token);
      navigate(`/client/home?id=${token.user_id}`);
    } else {
      alert('Login failed. Please check your username and password.');
    }
  }


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
    </form>
    </div>
    </section>
  );
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}
