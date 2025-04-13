import AuthContext from "../src/context/AuthContext";
import "../src/style/global.css";
import AuthInitializer from "@/components/AuthInitializer";
import {useState} from "react"

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(undefined); 
  const [loading, setLoading] = useState(true); 

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      <AuthInitializer>
        <Component {...pageProps} />
      </AuthInitializer>
    </AuthContext.Provider>
  );
}

export default MyApp;
