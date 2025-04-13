import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export function useAuthActions() {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState(null);

  const login = async ({ email, password }) => {
    setError(null);
    try {
      const response = await axios.post("/api/users/login", {
        user: { email, password },
      });
      const user = response.data;
      setUser(user);
      router.push("/editor");
    } catch (err) {
       console.error("Registration error:", err);
       if (err.response && err.response.data && err.response.data.errors) {
         const serverErrors = err.response.data.errors.body;
         setError(serverErrors.join(" "));
       } else {
         setError("An unexpected error occurred. Please try again.");
       }
    }
  };

  const register = async ({ username, email, password }) => {
    setError(null);
    try {
      const response = await axios.post("/api/users", {
        user: { username, email, password },
      });
      const user = response.data;
      setUser(user);
      router.push("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  const logout = async () => {
    try {
        await axios.post("/api/users/logout");
        setUser(null);
        router.push("/login");

    } catch(err) {
        console.error("Logout error:", err);
    }

  }
  return { login, register, logout, error };
}
