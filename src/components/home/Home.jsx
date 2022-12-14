/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllImages } from "../../context/slices/gallery/gallerySlice";
import NoImages from "../NoImages";
import ImageContainer from "./ImageContainer";

const Home = () => {
  const [imgs, setImages] = useState(
    JSON.parse(localStorage.getItem("userGallery"))
  );
  const { image, images } = useSelector((store) => store.gallery);
  const { user } = useSelector((store) => store.users);
  console.log("veveveveveve",user.isVerified);
  const dispatch = useDispatch();
  useEffect(() => {
    setImages(JSON.parse(localStorage.getItem("userGallery")));
  }, [images]);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        width: "100%",
        gap: "20px",
        padding: "1rem 1.5rem"
      }}
    >
      {imgs?.length === 0 && <NoImages />}
      {imgs?.map((img) => {
        return (
          <ImageContainer
            key={img.id}
            src={img.photo}
            alt={img.filename}
            title={img.fileName}
            id={img.id}
          />
        );
      })}
    </Container>
  );
};

export default Home;
