import React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import { Link, useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Box from "@mui/material/Box"
import { useUser } from '../hook/useUser';
import { Typography } from '@mui/material';
import Cookies from 'universal-cookie';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
    },
    title: {
        flexGrow: 5,
    },
    login: {
        marginLeft: "auto"

    },
    home: {
        color: "white",
        textDecoration: "none",
    },
    about: {
        color: "white",
        textDecoration: "none",
    },
    contact: {
        textDecoration: "none",
        color: "white",
    },
    menuIcon: {
        display: "flex",
        alignItems: "center",
    },
    toolbarStyles: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const navigate = useNavigate();
    const { handleOpen } = useUser();
    const cookies = new Cookies();
    const token = cookies.get("token");
    const handleLogout = async () => {
        await cookies.remove("token");
        navigate("/login")
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbarStyles}>
                    <Box className={classes.menuIcon}>
                        <MenuIcon />
                    </Box>
                    <Box>
                        {token ?
                            <Box>
                                <Typography>Hello, {token.firstName}</Typography>
                                <Button color="inherit" onClick={handleOpen}>Add User</Button>
                                <Button color="inherit" onClick={handleLogout}>Logout</Button>
                            </Box> :
                            <Box>
                                <Button color="inherit" className={classes.login} component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/register">Register</Button>
                            </Box>}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}