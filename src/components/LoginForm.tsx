import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";

// REF (Logging In and Session Tokens): https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

{
  /* //////////////////////////////////////////////////////////////////////////////

* Async Login Function
    Note: Async is a function that can perform an asynchronous (waited) operation till a operation or button is pressed / a promised is fulfilled
    1. This async function checks a login user creds that is fetched from the API
    2. Method is is POST for secure transmission of data rather than GET
    3. Headers has to be set to json so the API can read it and interpret the entered data from the user
    4. argument 'credentials' is passed as the object request 

* Sucessfull Login (setToken)
    1. If the login is sucessful the setToken then is called (if (token?.success) is true)
    2. This function sets out setItem that stores information in the session storage:
        - user_id, user_username, isAdmin
    3. This then can work out if the user is admin or not and will hold the lgoin data in the session 
    4. This session storage is then used at two other functions:
        - getToken() to get the user_id and user_username
        - setToken() to set the user_id and user_username (as described above)

    Satisfying the Token
    Before the user can call the login function they must satisfy what a token is:
    1. The user must enter a username and password
    2. The user must complete the captcha (hCaptcha) to ensure the user is human
    3. if this is met call the loginUser function.
    

* Getting Entered Login Information from Form & Using Consts
    1. username and setUsername is used to capture the username input from the form setUsername(e.target.value)
    2. password and setPassword is used to capture the password input from the form setPassword(e.target.value)
    3. navigate is used to redirect the user once the login is sucessful
    
* Captcha
    Note: Captcha (added for layer of security)
    1. captchaToken and setCaptchaToken is used to hold to see if the captcha has been compleated
    2. captchaRef is used to reference the captcha, for example if it needs to reset
    3. if (!captchaToken) is false it will alert the user to compleate the capture before they can move on

* Token Validation
    1. If the token is sucessful and the user has matched a database entry:
    2. Set the token and append the login information to session

    3. 
    a. if the token is also Admin so the value is === "Y" send the user to the admin portal OR
    b. anything else send to the client home page with the user token id parsed to the URL to get to the correct client page by ID


////////////////////////////////////////////////////////////////////////////// */
}

// TODO: Fill in the details of this type
type Credentials = {}

async function loginUser(credentials: Credentials) {
  return fetch("https://connorsnowpt.onrender.com/api/login-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function LoginForm() {
  const setToken = ({ user_id, user_username, isAdmin }) => {
    sessionStorage.setItem("user_id", user_id);
    sessionStorage.setItem("user_username", user_username);
    sessionStorage.setItem("isAdmin", isAdmin);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Capture Settings and States
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);

  const handleSubmit = async (e) => {
    //on submit prevent default (dont refresh) before doing this function
    e.preventDefault();
    if (!captchaToken) {
      // Check that the captcha has been done otherwise alert it needs to be done
      alert("Please complete the CAPTCHA.");
      return;
    }

    const token = await loginUser({
      // create a token that states that to login the user must satify these areas
      user_username: username,
      user_password: password,
      captchaToken,
    });

    if (token?.success) {
      //if the token to login is sucessful, then set the token
      setToken(token);

      if (token.isAdmin === "Y") {
        navigate("/admin/home");
        window.location.reload();
      } else {
        navigate(`/client/home?id=${token.user_id}`);
        window.location.reload(); // Reload the page to ensure the new token is applied
      }
    } else {
      alert("Login failed. Please check your username and password.");
    }
  };

  return (
    <section className="bg-gray-100 text-black">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Gym Login Image"
            className="h-full w-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute inset-0 m-8 flex items-center justify-center">
            <div className="rounded-lg bg-gray-600 bg-opacity-75 p-4 text-left">
              <h1 className="text-4xl font-bold text-white">
                CONNOR<span className="text-blue-600">SNOW</span>
              </h1>

              <p className="text-2xl text-white">Start Your Journey.</p>
              <p className="mt-8 text-white">
                Start your personal training journey and achieve the results you
                deserve.
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex w-full items-center justify-center bg-gray-900 p-8 md:w-1/2">
          {/* Login Form Section */}
          <div className="m-8 flex flex-col items-center justify-center rounded-lg bg-gray-800 p-8 px-4 shadow-lg">
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
              <label
                className="font-semibold text-white"
                htmlFor="user_username"
              >
                Username:
              </label>
              <input
                type="text"
                name="user_username"
                placeholder="Enter your username"
                className="mb-4 mt-2 w-full rounded border border-blue-600 bg-gray-600 p-2 text-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label
                className="font-semibold text-white"
                htmlFor="user_password"
              >
                Password:
              </label>
              <input
                type="password"
                name="user_password"
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

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}
