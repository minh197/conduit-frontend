import useAuthenticate from "../../src/hooks/useAuthenticate";

import React from "react";

function Editor() {
  const { user } = useAuthenticate();

  if (!user) {
    return <div>Loading...</div>;
  }
  return <div>Here is my editor</div>;
}

export default Editor;
