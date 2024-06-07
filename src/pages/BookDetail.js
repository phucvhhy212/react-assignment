import React, { useEffect, useState } from 'react';
import { Container, Grid, Breadcrumbs, Link, Typography, Button, Box, Paper, Tabs, Tab, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Layout from '../components/Layout';
import { useParams } from "react-router-dom"
import { getBookDetail } from '../services/bookService';
import { toast } from 'react-toastify';
import { createUserRequest } from '../services/userRequestService';
import { useCountBookInRequestContext } from '../context/countBookInRequestContext';
import { jwtDecode } from 'jwt-decode';

const BookDetailBackground = () => {
    const params = useParams()
    const { requestCount, setRequestCount } = useCountBookInRequestContext()
    const [book, setBook] = useState({})
    useEffect(() => {
        getBookDetail(params.id)
            .then(res => setBook(res.data.body))
            .catch(e => toast.error("Server error"))
    }, [])
    const handleAddToUserRequest = () => {
        if (requestCount === 5){
            toast.error("Maximum 5 books per request!")
        }
        else{
            const params = { bookId: book.id }
            createUserRequest(params).then(res => {
                if (res.data.statusCode === 200) {
                    toast.success("Added to your request!")
                    setRequestCount(requestCount + 1)
                }
                else {
                    toast.error(res.data.message)
                }
            }).catch(e => {console.log(e); toast.error("Server error")})
        }
    }
    return (
        <Container sx={{ paddingBottom: 5 }}>
            <Box sx={{ marginBottom: 3 }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ backgroundColor: 'white', padding: 1 }}>
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/books">
                        Book
                    </Link>
                    <Typography color="textPrimary">Book Detail</Typography>
                </Breadcrumbs>
            </Box>

            <Grid container spacing={5}>
                <Grid item lg={5} xs={12} sx={{ marginBottom: 3 }}>
                    <Box
                        component="img"
                        sx={{ width: '100%', height: 'auto', backgroundColor: 'white' }}
                        src={book?.image}
                        alt="Book Image"
                    />
                </Grid>

                <Grid item lg={7} xs={12} sx={{ marginBottom: 3 }}>
                    <Box sx={{ height: '100%', backgroundColor: 'white' }}>
                        <Box sx={{ p: 3 }}>
                            <Typography variant="h4" gutterBottom>
                                {book?.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                <Box sx={{ display: 'flex', color: 'primary.main', marginRight: 1 }}>
                                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} size="medium" readOnly />
                                </Box>
                                <Typography variant="body2">(99 Reviews)</Typography>
                            </Box>
                            <Typography variant="body1" paragraph>
                                {book?.introduction}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>Publisher:</strong> {book?.publisher}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>Publication Date:</strong> {book?.publicationDate?.slice(0, 10)}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                                {localStorage.getItem("token") && jwtDecode(localStorage.getItem("token")).role==="User" && <Button variant="contained" startIcon={<FavoriteBorderIcon />} sx={{ backgroundColor: "#ffc800", color: '#3D464D', textTransform: 'unset' }} onClick={() => handleAddToUserRequest(book.id)}>
                                    Add To Reservations List
                                </Button>}
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Paper sx={{ backgroundColor: 'white', padding: 3 }}>
                        <Tabs
                            textColor="primary"
                            indicatorColor="primary"
                            sx={{ marginBottom: 1 }}
                        >
                            <Tab label="Description" padding={0} />
                        </Tabs>
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Book Description
                            </Typography>
                            <Typography variant="body1">
                                {book?.description}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

const BookDetail = () => {

    return (
        <Layout>
            <BookDetailBackground></BookDetailBackground>
        </Layout>
    );
};

export default BookDetail;
