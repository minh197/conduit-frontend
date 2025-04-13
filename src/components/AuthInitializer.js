import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";

// Helper component to fetch initial auth state
function AuthInitializer({ children }) {
  const { setUser, setLoading, user } = useContext(AuthContext); // Add setLoading to context if needed
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only run once, or if user becomes null after being logged in (e.g., explicit logout)
    if (initialized || user !== undefined) {
      return;
    }

    const fetchUser = async () => {
      setLoading(true); // Indicate loading state
      try {
        const response = await axios.get("/api/users/me");
        setUser(response.data.user);
      } catch (error) {
        // This is expected if the user is not logged in (401/404)
        if (error.response?.status === 401 || error.response?.status === 404) {
          setUser(null);
        } else {
          console.error("Error fetching user:", error);
          setUser(null); // Set to null on unexpected errors too
        }
      } finally {
        setLoading(false); // Done loading
        setInitialized(true);
      }
    };

    fetchUser();
  }, [setUser, setLoading, initialized, user]); // Dependencies

  if (loading && !initialized) {
    return <div>Loading application...</div>;
  }

  return children;
}
export default AuthInitializer;
