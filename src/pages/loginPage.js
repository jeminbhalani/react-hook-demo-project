import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from '@mui/styles';
import { useRegister } from '../components/hook/useRegister';
import Cookies from 'universal-cookie';

const useStyles = makeStyles({
    container: {
        border: "1px solid #dddfe2",
        maxWidth: "300px",
        margin: "0 auto",
        padding: "15px 45px 15px 45px",
        marginTop: "10%",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)",
    },
    signupText: {
        fontWeight: "600",
        fontSize: "20px",
    },
    textField: {
        margin: "30px 0px 15px 0px",
    },
    submitBtn: {
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-around"
    },
    resetBtn: {
        borderRadius: 50,
        marginLeft: 10
    },
    forgotPass: {
        paddingBottom: "15px",
        textDecoration: "underline"
    }
});

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string("Enter your password")
        .required("Password is required"),
    // .string('Enter your password')
    // .min(8, 'Password should be of minimum 8 characters length')
    // .required('Password is required')
    // .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Password contain letter,symbol & number.'),
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const { registerData, setForgotEmail } = useRegister();
    const cookies = new Cookies();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            // let abc=registerData.filter(i=>values.email.includes(i.email))
            let validateLoginEmail = registerData.find(i => values.email === i.email)
            if (validateLoginEmail) {
                if (validateLoginEmail.password === values.password) {
                    // localStorage.setItem("token", JSON.stringify(validateLoginEmail))
                    cookies.set("token", JSON.stringify(validateLoginEmail))
                    navigate("/users/list");
                } else {
                    setOpen(true)
                }
            } else {
                setEmailError(true)
            }
            // let tokenData=cookies.get("token")
            // setAuthData(tokenData)
        },
    });

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
        setEmailError(false)
        setValidEmail(false)
    };

    const handleForgotPassword = () => {
        const forgotPassEmail = formik.values.email;
        let forgotEmail = registerData.find(i => forgotPassEmail === i.email);
        if (forgotEmail) {
            setForgotEmail(forgotPassEmail);
            navigate("/forgot/password")
        } else {
            setValidEmail(true)
        }
    }

    return (
        <>
            <div className={classes.container} >
                <p className={classes.signupText}>Sign in to ScriptUs</p>
                <form onSubmit={formik.handleSubmit}>
                    <div className={classes.textField}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
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
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </div>
                    <div className={classes.forgotPass} onClick={handleForgotPassword}>Forgot password</div>
                    <div className={classes.submitBtn}>
                        <Button color="primary" variant="contained" type="submit" >
                            Submit
                        </Button>
                        <Button className={classes.resetBtn} variant="contained" type="reset" onClick={() => formik.resetForm({
                            values: { email: "", password: '' },
                        })}>
                            Reset
                        </Button>
                    </div>
                </form>
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                    Password is incorrect
                </Alert>
            </Snackbar>
            <Snackbar open={emailError} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                    This is email is not registered please register first
                </Alert>
            </Snackbar>
            <Snackbar open={validEmail} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                    This email is not registered please enter valid email
                </Alert>
            </Snackbar>
        </>
    );
};

export default Login