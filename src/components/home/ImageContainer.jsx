import { IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage, getAllImages } from "../../context/slices/gallery/gallerySlice";

const ImageContainer = ({ src, alt, title, id }) => {
  const dispatch = useDispatch()
  const { image } = useSelector(store => store.gallery)
  function deleteHandler() {
    dispatch(deleteImage(id))
    dispatch(getAllImages())
  }

  return (
    <div
      style={{
        borderRadius: "10px",
        boxShadow: "0px 4px 18px -3px rgba(0,0,0,0.75)",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          borderRadius: "10px",
        }}
      />
      <Container
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 7px",
        }}
      >
        <Typography>{title.split("-")[2]}</Typography>
        <IconButton aria-label="delete">
          <AiFillDelete color="darkRed" onClick={deleteHandler} />
        </IconButton>
      </Container>
    </div>
  );
};

export default ImageContainer;
