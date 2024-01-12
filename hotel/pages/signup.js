import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (
      !username ||
      !password ||
      !firstName ||
      !lastName ||
      !nip ||
      !email ||
      !contact
    ) {
      setError("All fields must be filled in");
      return;
    }

    try {
      // Make a sign-up request to the specified endpoint
      const response = await axios.post("http://localhost:8000/auth/signup/", {
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        nip,
        email,
        kontak: contact,
      });

      // Assuming the API returns a token upon successful sign-up
      const message = response.data.message;

      if (message === "OK") {
        // Sign-up successful
        // Redirect the user to another page or perform other actions as needed
        router.push("/dashboard");
      } else if (message === "Username sudah ada") {
        setError("Username is already in use");
      } else if (message === "Anda sudah terdaftar") {
        setError("You are already registered with the provided NIP or email");
      } else {
        setError("An error occurred during sign-up");
      }

      // Redirect the user to another page if sign-up is successful
      router.push("/dashboard");
    } catch (error) {
      console.error("Sign-up Error:", error.message);

      // Handle different error cases
      if (error.response && error.response.status === 409) {
        // Conflict (username or email already exists)
        setError("Username or email is already in use");
      } else {
        setError("An error occurred during sign-up");
      }
    }
  };

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSignUp} className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
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
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-600"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full text-gray-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-600"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full text-gray-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="nip"
            className="block text-sm font-medium text-gray-600"
          >
            NIP
          </label>
          <input
            type="text"
            id="nip"
            name="nip"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full text-gray-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full text-gray-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-600"
          >
            Contact
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full text-gray-500"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full"
          >
            Sign Up
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

export default SignUp;
