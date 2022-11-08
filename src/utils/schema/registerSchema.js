import * as Yup from "yup";

const registerSchema = Yup.object({
  firstName: Yup.string().min(2).required("FirstName is required"),
  lastName: Yup.string().min(2).required("Last Name is required"),
  email: Yup.string().email().required("email is required"),
  phone: Yup.string().length(10).required("Ph.No. is required"),
  password: Yup.string().min(6).required("password is required"),
  confirm_password: Yup.string()
    .required("confirm password is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export default registerSchema