import { useAuthActions } from "@/hooks/useAuthActions";
import AuthCard from "../src/components/AuthCard";

export default function Login() {
  const {login, error} = useAuthActions()
  

  const handleLogin = async ({email, password}) => {
    console.log("email", email)
    console.log("password", password)
    await login({email, password})
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
