import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password must be filled in");
      return;
    }

    try {
      // Make a login request to the specified endpoint
      const response = await axios.post("http://localhost:8000/auth/login/", {
        username,
        password,
      });

      // Assuming the API returns a token upon successful login
      const token = response.data.token;

      // Store the token in localStorage or a global state management solution
      // Example using localStorage:
      localStorage.setItem("token", token);

      // Redirect the user to another page if authentication is successful
      router.push("/halaman_guest");
    } catch (error) {
      console.error("Login Error:", error.message);

      // Handle different error cases
      if (error.response && error.response.status === 401) {
        // Unauthorized (invalid credentials)
        setError("Invalid username or password");
      } else {
        setError("An error occurred during login");
      }
    }
  };

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full text-gray-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full text-gray-500"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full"
          >
            Login
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={handleBack}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
