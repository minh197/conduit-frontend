import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export function useAuthActions() {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState(null);

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post("/api/users/login", {
        user: { email, password },
      });
      const user = response.data;
      localStorage.setItem("token", user.token);
      setUser(user);
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  const register = async ({ username, email, password }) => {
    try {
      const response = await axios.post("/api/users", {
        user: { username, email, password },
      });
      const user = response.data;
      localStorage.setItem("token", user.token);
      setUser(user);
      router.push("/");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };
  return { login, register, error };
}


