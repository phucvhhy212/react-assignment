import React from 'react';
import Avatar from '@mui/material/Avatar';
import { TextField, Button, Box, Container, Typography, Grid, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LockIcon from '@mui/icons-material/Lock';
import { login, register } from '../services/authenticateService';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

export default function Signup() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().min(8, 'Email must be at least 8 characters').email('Invalid email address').required('Required'),
            userName: Yup.string().min(4, 'Username must be at least 4 characters').required('Required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
        }),
        onSubmit: (values) => {
            register(values.userName,values.email, values.password)
                .then(response => {
                    if (response.data.statusCode === 200) {
                        toast.success("Register successfully")
                    }
                    else {
                        toast.error(response.data.message);
                    }
                })
                .catch(e => {console.log(e); toast.error('Register failed')})
        },
    });

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ flex: 1, backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', height: '100vh' }} />
                <Container
                    component="form"
                    onSubmit={formik.handleSubmit}
                    noValidate
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: 'auto', flex: 1 }}
                >
                    <Avatar sx={{ m: 'auto', bgcolor: 'secondary.main' }}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" align='center'>
                        Sign in
                    </Typography>
                    <TextField
                        sx={{ width: '50%', margin: 'auto' }}
                        fullWidth
                        id="userName"
                        name="userName"
                        label="UserName"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.userName && Boolean(formik.errors.userName)}
                        helperText={formik.touched.userName && formik.errors.userName}
                    />
                    <TextField
                        sx={{ width: '50%', margin: 'auto' }}
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        sx={{ width: '50%', margin: 'auto' }}
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button
                        sx={{ width: '50%', margin: 'auto' }}
                        color="primary" variant="contained"
                        fullWidth
                        type="submit"
                    >
                        Sign Up
                    </Button>
                    <Grid sx={{ width: '50%', margin: 'auto' }} container>
                        <Grid item xs>
                            <Link href="/" variant="body2">
                                Back to Home
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/Login" variant="body2">
                                {"Already have an account? Log In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}