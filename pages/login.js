// pages/login.js
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="container mx-auto bg-black"
    >
      <h1>Sign In</h1>
      <form>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border"
        />
        <button type="submit" className="btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
}
