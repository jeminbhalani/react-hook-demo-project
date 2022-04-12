import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useRegister } from '../components/hook/useRegister';

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
    password: yup
        .string('Enter your password')
        .required('password is required'),
    confirmpassword: yup
        .string("Confirm your password")
        .required("confirm password is required")
        .oneOf([yup.ref("password"), null], "Password is not matching"),
});
const ForgotPassword = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const { registerData,editForgotPassword,forgotEmail } = useRegister()
    if(!forgotEmail){
        navigate("/login")
    }
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmpassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            let forgotPassData = registerData.find(i => forgotEmail === i.email)
            let newPasswordData={
                firstName:forgotPassData.firstName,
                lastName:forgotPassData.lastName,
                email:forgotPassData.email,
                id:forgotPassData.id,
                password:values.password,
                confirmpassword:values.confirmpassword
            };
            editForgotPassword(newPasswordData)
            navigate("/login");
        },
    });

    return (
        <div className={classes.container} >
            <p className={classes.signupText}>Confirm your password</p>
            <form onSubmit={formik.handleSubmit}>
                <div className={classes.textField}>
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        variant="outlined"
                        type="password"
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
                <div className={classes.textField}>
                    <TextField
                        fullWidth
                        id="confirmpassword"
                        name="confirmpassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        inputProps={{
                            autoComplete: 'new-password',
                            form: {
                                autoComplete: 'off',
                            },
                        }}
                        value={formik.values.confirmpassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                        helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                    />
                </div>
                <div className={classes.submitBtn}>
                    <Button color="primary" variant="contained" type="submit" >
                        Confirm Password
                    </Button>

                    <Button className={classes.resetBtn} variant="contained" type="reset" onClick={() => formik.resetForm({
                        values: { email: "", password: '' },
                    })}>
                        Reset
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword
