import { useState } from "react";
import { useNavigate } from "react-router-dom";

async function loginUser(credentials) {
  return fetch("https://connorsnowpt.onrender.com/api/login-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const setToken = ({ user_id, user_username, isAdmin }) => {
    sessionStorage.setItem("user_id", user_id);
    sessionStorage.setItem("user_username", user_username);
    sessionStorage.setItem("isAdmin", isAdmin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run reCAPTCHA first
    grecaptcha.enterprise.ready(async () => {
      const recaptchaToken = await grecaptcha.enterprise.execute(
        "6Lce5IsrAAAAAFasRzvQw9bMXs1d8LQkXJQb2k2g",
        { action: "login" }
      );

      console.log("reCAPTCHA Token:", recaptchaToken);

      // Send login request along with recaptcha token
      const token = await loginUser({
        user_username: username,
        user_password: password,
        recaptchaToken,
      });

      if (token?.success) {
        setToken(token);
        if (token.isAdmin === "Y") {
          navigate("/admin/home");
        } else {
          navigate(`/client/home?id=${token.user_id}`);
        }
      } else {
        alert("Login failed. Please check your username and password.");
      }
    });
  };

  return (
<section className="text-black bg-gray-100">
  <div className="flex flex-col md:flex-row">
    {/* Image Section */}
    <div className="relative md:w-1/2">
      <img
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        alt="Gym Login Image"
        className="w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute inset-0 flex items-center justify-center m-8">
          <div className="bg-gray-600 bg-opacity-75 p-4 rounded-lg text-left">
            <h1 className="text-4xl text-white font-bold">CONNOR<span className="text-blue-600">SNOW</span></h1>

            <p className="text-2xl text-white">Start Your Journey.</p>
            <p className="mt-8 text-white">Start your personal training journey and achieve the results you deserve.</p>
          </div>
      </div>
    </div>

    {/* Content Section */}
    <div className="w-full md:w-1/2 bg-gray-900 flex items-center justify-center p-8">

        {/* Login Form Section */}
          <div className="m-8 px-4 flex flex-col items-center justify-center bg-gray-800 p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
              <label className="text-white font-semibold" htmlFor="user_username">
                Username:
              </label>
              <input
                type="text"
                name="user_username"
                placeholder="Enter your username"
                className="bg-gray-600 text-white w-full p-2 mt-2 mb-4 border border-blue-600 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="text-white font-semibold" htmlFor="user_password">
                Password: 
              </label>
              <input
                type="password"
                name="user_password"
                placeholder="Enter your password"
                className="bg-gray-600 text-white w-full p-2 mt-2 mb-4 border border-blue-600 rounded"
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
        </div>
      </div>
    </section>
  );
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}
