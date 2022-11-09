import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../context/slices/user/userSlice";
import { BiImageAdd } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import UploadImageModal from "./uploadImageModal";
import { Container } from "@mui/system";
import Progress from "../utils/error/ProgressBar";
import { BsPersonCheckFill } from "react-icons/bs";
import { SlLogout } from "react-icons/sl";

const Navbar = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.gallery);
  const images = JSON.parse(localStorage.getItem("userGallery"));
  const [openModal, setOpenModal] = useState(false);
  function openModalHandler() {
    setOpenModal((prev) => !prev);
  }
  function logoutHandler() {
    dispatch(userLogout());
  }
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const verifyAccountHandler = () => {};

  return (
    <AppBar sx={{ backgroundColor: "white", boxShadow: "0" }} position="static">
      {loading && <Progress />}
      <Toolbar>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "75vw",
            margin: "1.9rem 0",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            Media Liberary
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            {images?.length} Images
          </Typography>
        </Container>
        <Button
          style={{
            backgroundColor: "rgba(196, 45, 238, 0.8)",
            color: "white",
          }}
          onClick={openModalHandler}
        >
          <BiImageAdd size={20} />
          Upload Image
        </Button>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MdAccountCircle style={{ color: "black" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={verifyAccountHandler}>
              <BsPersonCheckFill style={{ marginRight: "9px" }} />
              Verify Account
            </MenuItem>
            <MenuItem onClick={logoutHandler}>
              <SlLogout style={{ marginRight: "9px" }} />
              LogOut
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
      <UploadImageModal openModal={openModal} setOpenModal={setOpenModal} />
    </AppBar>
  );
};

export default Navbar;
