import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
// import "../../App1.css"
import { useNavigate } from "react-router-dom";
import { Button, TextField, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import { useRegister } from "../components/hook/useRegister";

const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    border: "1px solid #dddfe2",
    maxWidth: "350px",
    margin: "0 auto",
    padding: "15px 45px 15px 45px",
    marginTop: "5%",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)",
  },
  signupText: {
    fontWeight: "600",
    fontSize: "20px",
  },
  textField: {
    margin: "30px 0px",
  },
  signupBtn: {
    margin: "30px 0px 20px 0px",
  },
  alreadyReg: {
    display: "flex",
    justifyContent: "end",
  },
  signIn: {
    textDecoration: "underline",
    paddingLeft: "5px",
  },
});

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your firstname")
    .required("Firstname is required"),
  lastName: yup.string("Enter your lastname").required("Lastname is required"),
  email: yup
    .string("Enter your email")
    .email("email is invalid")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
  confirmpassword: yup
    .string("Confirm password")
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Password is not matching"),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RegisterPage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { addRegisterData, registerData } = useRegister();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const registeredEmail = registerData.find(
        (i) => values.email === i.email
      );
      if (!registeredEmail) {
        addRegisterData(values);
        navigate("/login");
      } else {
        setOpen(true);
      }
    },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  if (token) {
    navigate("/users/list");
  }

  return (
    <>
      <div className={classes.container}>
        <p className={classes.signupText}>Sign up to ScriptUs</p>
        <form onSubmit={formik.handleSubmit}>
          <div className={classes.textField}>
            <TextField
              name="firstName"
              fullWidth
              id="outlined-basic"
              label="FirstName"
              variant="outlined"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </div>
          <div className={classes.textField}>
            <TextField
              name="lastName"
              fullWidth
              id="outlined-basic"
              label="LastName"
              variant="outlined"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </div>
          <div className={classes.textField}>
            <TextField
              name="email"
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div className={classes.textField}>
            <TextField
              name="password"
              fullWidth
              id="outlined-basic"
              label="Password"
              type="password"
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <div className={classes.textField}>
            <TextField
              name="confirmpassword"
              fullWidth
              id="outlined-basic"
              type="password"
              label="Confirm Password"
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              variant="outlined"
              value={formik.values.confirmpasswordmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmpassword &&
                Boolean(formik.errors.confirmpassword)
              }
              helperText={
                formik.touched.confirmpassword && formik.errors.confirmpassword
              }
            />
          </div>
          <div className={classes.signupBtn}>
            <Button type="submit" fullWidth variant="contained">
              Sign Up
            </Button>
          </div>
        </form>
        <p className={classes.alreadyReg}>
          Already registered{" "}
          <span
            className={classes.signIn}
            onClick={() => {
              navigate("/login");
            }}
          >
            {" "}
            Sign in?
          </span>
        </p>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Email already exists try another one
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterPage;
