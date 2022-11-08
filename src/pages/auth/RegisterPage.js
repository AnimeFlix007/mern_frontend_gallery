/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import registerSchema from "../../utils/schema/registerSchema";
import RegisterPoster from "../../images/registerPoster.jfif";
import { userRegister } from "../../context/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirm_password: "",
};

const RegisterPage = () => {
  const [navigateUser, setNavigateUser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, registered } = useSelector((store) => store.users);
  const { errors, handleBlur, handleSubmit, values, handleChange, touched } =
    useFormik({
      initialValues,
      validationSchema: registerSchema,
      onSubmit: ({ confirm_password, ...values }, action) => {
        dispatch(userRegister(values));
        setNavigateUser(true);
        action.resetForm();
      },
    });

  useEffect(() => {
    if (registered && navigateUser) {
      setNavigateUser(false)
      navigate("/login");
    }
  }, [navigateUser, registered]);

  return (
    <div className="container">
      <div className="modal">
        <div className="modal-container">
          <div className="modal-left">
            <h1 className="modal-title">Begin Your Journey!</h1>
            <p className="modal-desc">Please Register My Dear Users.</p>
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label htmlFor="firstName" className="input-label">
                  First Name
                </label>
                <input
                  type="name"
                  autoComplete="off"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName ? (
                  <p className="form-error">{errors.firstName}</p>
                ) : null}
              </div>
              <div className="input-block">
                <label htmlFor="lastName" className="input-label">
                  Last Name
                </label>
                <input
                  type="name"
                  autoComplete="off"
                  name="lastName"
                  id="lastName"
                  placeholder="First Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName ? (
                  <p className="form-error">{errors.lastName}</p>
                ) : null}
              </div>
              <div className="input-block">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="form-error">{errors.email}</p>
                ) : null}
              </div>

              <div className="input-block">
                <label htmlFor="phone" className="input-label">
                  Phone No.
                </label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  placeholder="Phone No."
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && touched.phone ? (
                  <p className="form-error">{errors.phone}</p>
                ) : null}
              </div>
              <div className="input-block">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <p className="form-error">{errors.password}</p>
                ) : null}
              </div>
              <div className="input-block">
                <label htmlFor="confirm_password" className="input-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirm Password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirm_password && touched.confirm_password ? (
                  <p className="form-error">{errors.confirm_password}</p>
                ) : null}
              </div>
              <div className="modal-buttons">
                {!loading ? (
                  <button className="input-button" type="submit">
                    Registration
                  </button>
                ) : (
                  <button className="input-button" disable="true">
                    Loading..
                  </button>
                )}
              </div>
            </form>
            <p className="sign-up">
              Already have an account? <Link to={"/login"}>LogIn Now</Link>
            </p>
          </div>
          <div className="modal-right">
            <img src={RegisterPoster} alt="register" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
