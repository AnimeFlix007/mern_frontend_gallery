import { Snackbar } from "@mui/material";
import React from "react";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { galleryActions } from "../../context/slices/gallery/gallerySlice";

const Alert = () => {
  const dispatch = useDispatch()
  const { open, message, type } = useSelector((store) => store.gallery.error);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(galleryActions.gremoveAlert())
  };
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={type}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
