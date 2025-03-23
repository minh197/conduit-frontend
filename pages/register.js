import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import AuthCard from "../src/components/AuthCard";

export default function Register() {
  const { setUser } = useContext(AuthContext);

  const handleRegister = async ({ username, email, password }) => {
    // Registration logic here
    console.log("Registering with:", username, email, password);
  
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
      <AuthCard onSubmit={handleRegister} />
    </div>
  );
}
