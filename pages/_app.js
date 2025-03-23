import { useState, useEffect } from "react";
import AuthContext from "../src/context/AuthContext";
import "../src/style/global.css";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/user", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setUser(res.data.user))
        .catch((err) => {
          console.error("Failed to fetch current user:", err);
          localStorage.removeItem("token");
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
