import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Link from "next/link";
import AuthCard from "../src/components/AuthCard";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
      <AuthCard
        onSubmit={handleLogin}
      >
      </AuthCard>
    </div>
  );
}
