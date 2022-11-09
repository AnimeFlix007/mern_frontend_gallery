import { Container } from "@mui/material";
import React from "react";
import NoImagesbG from "../images/noImages.png";

const NoImages = () => {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <img src={NoImagesbG} alt="nOiMAGES" />
    </Container>
  );
};

export default NoImages;
