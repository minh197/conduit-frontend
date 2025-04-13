import AuthContext from "../src/context/AuthContext";
import "../src/style/global.css";
import AuthInitializer from "@/components/AuthInitializer";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AuthInitializer>
        <Component {...pageProps} />
      </AuthInitializer>
    </AuthContext.Provider>
  );
}

export default MyApp;
