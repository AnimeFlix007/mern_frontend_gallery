import React from "react";
import { useSelector } from "react-redux";
import Router from "./router/Router";
import UserAlert from "./utils/error/Alert";
import GalleryAlert from "./utils/error/GalleryAlert";
import Progress from "./utils/error/ProgressBar";

function App() {
  const { loading } = useSelector(store => store.users)
  return (
    <React.Fragment>
      {loading && <Progress />}
      <Router />
      <UserAlert />
      <GalleryAlert />
    </React.Fragment>
  );
}

export default App;
