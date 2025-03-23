import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AuthCard({ onSubmit }) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);

  const buttonText = isLoginPage ? "Sign in" : "Sign up";
  const linkText = isLoginPage ? "Need an account?" : "Have an account?";
  const linkHref = isLoginPage ? "/register" : "/login";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLoginPage) {
        await onSubmit({ email, password });
      } else {
        await onSubmit({ username, email, password });
      }
    } catch (error) {
      setErrors(
        Array.isArray(error) ? error : [error.message || "An error occurred"]
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">

      <p className="text-center mb-6">
        <Link
          href={linkHref}
          className="text-green-500 hover:text-green-700 transition-colors"
        >
          {linkText}
        </Link>
      </p>

      {errors.length > 0 && (
        <ul className="bg-red-100 p-4 mb-6 rounded text-red-700 text-sm">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        {!isLoginPage && (
          <div className="mb-4">
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}
