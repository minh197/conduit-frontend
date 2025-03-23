import { useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import "../src/style/global.css";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
