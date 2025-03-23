import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";

function useAuthenticate() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  return { user };
}

export default useAuthenticate;
