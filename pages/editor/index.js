import useAuthenticate from "../../src/hooks/useAuthenticate";
import { useAuthActions } from "@/hooks/useAuthActions";


import React from "react";

function Editor() {
      const { logout } = useAuthActions();

  const { user } = useAuthenticate();

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleLogOut = async() => {
    console.log("SIGNING OUT")
    await logout()
  }
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  transition-colors duration-200"
        onClick={handleLogOut}
      >
        Logout
      </button>
    </div>
  );
}

export default Editor;
