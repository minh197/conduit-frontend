import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import AuthCard from "../src/components/AuthCard";

export default function Register() {
  const { setUser } = useContext(AuthContext);

  const handleRegister = async ({ username, email, password }) => {
    try {
      const response = await axios.post("api/users", {
        user: { username, email, password },
      });
      const user = response.data;
      localStorage.setItem("token", user.token);
      setUser(user);
      router.push("/");
    } catch {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
      <AuthCard onSubmit={handleRegister} />
    </div>
  );
}
