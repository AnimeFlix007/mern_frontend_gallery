import { Button } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import page404 from "../images/page404.png";

const Page404 = () => {
  const navigate = useNavigate();
  function navigateHandler() {
    navigate("/");
  }
  return (
    <React.Fragment>
      <Navbar />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={page404}
          alt="page404"
          style={{
            width: "50%",
          }}
        />
        <Button variant="contained" style={{ margin: "1rem 0" }} onClick={navigateHandler}>
          Back To Home
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default Page404;
