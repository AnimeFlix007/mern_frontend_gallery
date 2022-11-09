import React from "react";
import Router from "./router/Router";
import UserAlert from "./utils/error/Alert";
import GalleryAlert from "./utils/error/GalleryAlert";

function App() {
  return (
    <React.Fragment>
      <Router />
      <UserAlert />
      <GalleryAlert />
    </React.Fragment>
  );
}

export default App;
