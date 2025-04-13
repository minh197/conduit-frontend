import { useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext";

function useAuthenticate() {
  const { user, loading } = useContext(AuthContext);
  
  return { user, loading };
}

export default useAuthenticate;
