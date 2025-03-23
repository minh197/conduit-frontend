import { useAuthActions } from "@/hooks/useAuthActions";
import AuthCard from "../src/components/AuthCard";

export default function Register() {
  const { register } = useAuthActions();

  const handleRegister = async ({ username, email, password }) => {
    await register({ username, email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
      <AuthCard onSubmit={handleRegister} />
    </div>
  );
}
