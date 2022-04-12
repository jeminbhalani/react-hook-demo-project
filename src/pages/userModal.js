import React from 'react'
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import { useUser } from '../components/hook/useUser';
import { useFormik } from 'formik';
import * as yup from 'yup';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: "500px",
    overflow: "auto",
};

const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    username: yup
        .string('Enter your username')
        .required('Username is required'),
    email: yup
        .string("Enter Your email")
        .email('Invalid email format')
        .required("Email is required"),
    street: yup
        .string("Enter your street")
        .required("Street is required"),
    suite: yup
        .string("Enter your suite")
        .required("Suite is required"),
    city: yup
        .string("Enter your city")
        .required("City is required"),
    zipcode: yup
        .string("Enter your zipcode")
        .required("Zipcode is required")
        .matches(/^[0-9,-]+$/, "Must be only digits")
        .min(5, 'Must be exactly 5 digits')
        .max(10, 'Must be exactly 5 digits'),
    phone: yup
        .string("Enter your phone number")
        .required("Phone number is required")
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid'),
    website: yup
        .string("Enter your website")
        .required("Website is required")
        .matches(/((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, "Website is not valid"),
    companyname: yup
        .string("Enter your company Name")
        .required("Company name is required"),
});

const UserModal =React.forwardRef ((prop,ref) => {


    const {
        editData,
        handleClose,
        editUserData,
        addUserData
    } = useUser()

    const formik = useFormik({
        initialValues: {
            name: editData ? editData?.name : "",
            username: editData ? editData?.username : "",
            email: editData ? editData?.email : "",
            phone: editData ? editData?.phone : "",
            website: editData ? editData?.website : "",
            street: editData ? editData?.address?.street : "",
            suite: editData ? editData?.address?.suite : "",
            city: editData ? editData?.address?.city : "",
            zipcode: editData ? editData?.address?.zipcode : "",
            companyname: editData ? editData?.company?.name : "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            // navigate("/");
            let updatedData = {
                id: editData?.id,
                name: values.name,
                username: values.username,
                email: values.email,
                phone: values.phone,
                website: values.website,
                address: {
                    street: values.street,
                    suite: values.suite,
                    city: values.city,
                    zipcode: values.zipcode,
                },
                company: {
                    name: values.companyname,
                }
            }
            let newUserData = {
                name: values.name,
                username: values.username,
                email: values.email,
                phone: values.phone,
                website: values.website,
                address: {
                    street: values.street,
                    suite: values.suite,
                    city: values.city,
                    zipcode: values.zipcode,
                },
                company: {
                    name: values.companyname,
                }
            }
            editData ? editUserData(updatedData) : addUserData(newUserData)
        },
    });

    return (
        <Box sx={style}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    name="name"
                    style={{ marginBottom: "15px" }}
                    fullWidth id="outlined-basic"
                    label="Name"
                    onChange={formik.handleChange}
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    defaultValue={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    name="username"
                    style={{ marginBottom: "15px" }}
                    fullWidth id="outlined-basic"
                    label="UserName"
                    defaultValue={formik.values.username}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    name="email"
                    style={{ marginBottom: "15px" }}
                    fullWidth id="outlined-basic"
                    label="Email"
                    defaultValue={formik.values.email}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    name="street"
                    style={{ marginBottom: "15px" }}
                    fullWidth id="outlined-basic"
                    label="Street"
                    defaultValue={formik.values.street}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.street && Boolean(formik.errors.street)}
                    helperText={formik.touched.street && formik.errors.street} />
                <TextField
                    name="suite"
                    style={{ marginBottom: "15px" }}
                    fullWidth id="outlined-basic"
                    label="Suite"
                    defaultValue={formik.values.suite}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.suite && Boolean(formik.errors.suite)}
                    helperText={formik.touched.suite && formik.errors.suite}
                />
                <TextField
                    name="city"
                    style={{ marginBottom: "15px" }}
                    fullWidth id="outlined-basic"
                    label="city"
                    defaultValue={formik.values.city}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                />
                <TextField
                    name="zipcode"
                    style={{ marginBottom: "15px" }}
                    fullWidth id="outlined-basic"
                    label="Zipcode"
                    defaultValue={formik.values.zipcode}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                    helperText={formik.touched.zipcode && formik.errors.zipcode}
                />
                <TextField
                    name="phone"
                    style={{ marginBottom: "15px" }}
                    fullWidth id="outlined-basic"
                    label="Phone"
                    defaultValue={formik.values.phone}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
                <TextField
                    name="website"
                    style={{ marginBottom: "15px" }}
                    fullWidth id="outlined-basic"
                    label="Website"
                    defaultValue={formik.values.website}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.website && Boolean(formik.errors.website)}
                    helperText={formik.touched.website && formik.errors.website}
                />
                <TextField
                    name="companyname"
                    style={{ marginBottom: "15px" }}
                    fullWidth id="outlined-basic"
                    label="Company Name"
                    defaultValue={formik.values.companyname}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.companyname && Boolean(formik.errors.companyname)}
                    helperText={formik.touched.companyname && formik.errors.companyname}
                />
                <Box style={{ display: "flex", justifyContent: "space-around", paddingTop: "20px" }}>
                    <Button onClick={handleClose} variant="outlined">Cancle</Button>
                    {editData ?
                        <Button variant="contained" type="submit">Update</Button> :
                        <Button variant="contained" type="submit">Add User</Button>
                    }
                </Box>
            </form>
        </Box>
    )
})

export default UserModal