import React from "react";
import Router from "./router/Router";
import Alert from "./utils/error/Alert";

function App() {
  return (
    <React.Fragment>
      <Router />
      <Alert />
    </React.Fragment>
  );
}

export default App;
