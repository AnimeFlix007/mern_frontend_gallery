/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { userVerify } from "../../context/slices/user/userSlice";

const VerifyPage = () => {
  const { token } = useParams();
  console.log(token);
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(userVerify(token));
  }, [token]);
  return (
    <>
      <div>Contrats You are now verified.</div>
      <Link to={'/'} >Back To Home Page</Link>
    </>
  );
};

export default VerifyPage;
