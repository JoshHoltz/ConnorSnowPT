import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";

type Credentials = {};

async function loginUser(credentials: Credentials) {
  return fetch("https://connorsnowpt.onrender.com/api/login-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function completeSetup(setupData) {
  return fetch("https://connorsnowpt.onrender.com/api/complete-setup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(setupData),
  }).then((data) => data.json());
}

export default function LoginForm() {
  const setToken = ({ user_id, user_username, isAdmin }) => {
    sessionStorage.setItem("user_id", user_id);
    sessionStorage.setItem("user_username", user_username);
    sessionStorage.setItem("isAdmin", isAdmin);
  };

  const [step, setStep] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [userUsername, setUserUsername] = useState("");

  const navigate = useNavigate();

  // Setup form states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");

  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!captchaToken) {
      setError("Please complete the CAPTCHA.");
      return;
    }

    const token = await loginUser({
      user_username: username,
      user_password: password,
      captchaToken,
    });

    if (token?.success) {
      setUserId(token.user_id);
      setUserUsername(token.user_username);
      setIsAdmin(token.isAdmin);

      if (token.requiresSetup) {
        setStep("setup");
      } else {
        setToken(token);

        if (token.isAdmin === "Y") {
          navigate("/admin/home");
          window.location.reload();
        } else {
          navigate(`/client/home?id=${token.user_id}`);
          window.location.reload();
        }
      }
    } else {
      setError("Login failed. Please check your username and password.");
    }
  };

  const handleSetupSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!newPassword || !firstName || !lastName || !phone || !goal) {
      setError("All fields are required.");
      return;
    }

    const setupResult = await completeSetup({
      user_id: userId,
      new_password: newPassword,
      first_name: firstName,
      last_name: lastName,
      phone,
      goal,
    });

    if (setupResult?.success) {
      setToken({
        user_id: userId,
        user_username: userUsername,
        isAdmin,
      });

      if (isAdmin === "Y") {
        navigate("/admin/home");
        window.location.reload();
      } else {
        navigate(`/client/home?id=${userId}`);
        window.location.reload();
      }
    } else {
      setError("Setup failed. Please try again.");
    }
  };

  if (step === "login") {
    return (
      <section className="bg-gray-100 text-black">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
              alt="Gym Login Image"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute inset-0 m-8 flex items-center justify-center">
              <div className="rounded-lg bg-gray-600 bg-opacity-75 p-4 text-left">
                <h1 className="text-4xl font-bold text-white">
                  CONNOR<span className="text-blue-600">SNOW</span>
                </h1>
                <p className="text-2xl text-white">Start Your Journey.</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex w-full items-center justify-center bg-gray-900 p-8 md:w-1/2">
            <div className="m-8 flex flex-col items-center justify-center rounded-lg bg-gray-800 p-8 px-4 shadow-lg">
              <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
              {error && (
                <div className="mt-4 w-full rounded bg-red-600 p-3 text-white text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleLoginSubmit} className="mt-4 w-full max-w-md">
                <label className="font-semibold text-white">Username:</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="mb-4 mt-2 w-full rounded border border-blue-600 bg-gray-600 p-2 text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

                <label className="font-semibold text-white">Password:</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="mb-4 mt-2 w-full rounded border border-blue-600 bg-gray-600 p-2 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <HCaptcha
                  sitekey="86ac12b0-919e-4d8c-9df6-975c73a6ad76"
                  onVerify={(token) => setCaptchaToken(token)}
                  ref={captchaRef}
                />

                <button
                  type="submit"
                  className="mt-4 w-full rounded bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
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

  if (step === "setup") {
    return (
      <section className="bg-gray-100 text-black">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
              alt="Gym Setup Image"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute inset-0 m-8 flex items-center justify-center">
              <div className="rounded-lg bg-gray-600 bg-opacity-75 p-4 text-left">
                <h1 className="text-4xl font-bold text-white">
                  CONNOR<span className="text-blue-600">SNOW</span>
                </h1>
                <p className="text-2xl text-white">Complete Your Profile</p>
              </div>
            </div>
          </div>

          {/* Setup Form */}
          <div className="flex w-full items-center justify-center bg-gray-900 p-8 md:w-1/2">
            <div className="m-8 flex flex-col items-center justify-center rounded-lg bg-gray-800 p-8 px-4 shadow-lg max-w-md">
              <h1 className="text-2xl font-bold text-white">Setup Your Account</h1>
              {error && (
                <div className="mt-4 w-full rounded bg-red-600 p-3 text-white text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSetupSubmit} className="mt-4 w-full">
                <label className="font-semibold text-white">New Password:</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="mb-4 mt-2 w-full rounded border border-blue-600 bg-gray-600 p-2 text-white"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />

                <label className="font-semibold text-white">Confirm Password:</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="mb-4 mt-2 w-full rounded border border-blue-600 bg-gray-600 p-2 text-white"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <label className="font-semibold text-white">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="mb-4 mt-2 w-full rounded border border-blue-600 bg-gray-600 p-2 text-white"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />

                <label className="font-semibold text-white">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="mb-4 mt-2 w-full rounded border border-blue-600 bg-gray-600 p-2 text-white"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />

                <label className="font-semibold text-white">Phone:</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="mb-4 mt-2 w-full rounded border border-blue-600 bg-gray-600 p-2 text-white"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <label className="font-semibold text-white">Goal:</label>
                <input
                  type="text"
                  placeholder="Enter your fitness goal"
                  className="mb-4 mt-2 w-full rounded border border-blue-600 bg-gray-600 p-2 text-white"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className="mt-4 w-full rounded bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Complete Setup
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
