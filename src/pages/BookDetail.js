import React from 'react';
import { Container, Grid, Breadcrumbs, Link, Typography, Button, Box, Paper, Tabs, Tab, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Layout from '../components/Layout';
import { useParams } from "react-router-dom"

const BookDetail = () => {
    var a  = useParams()
    console.log(a.id);
    const book = {
        title: 'Dance With The Devils',
        introduction: 'This is the intro',
        publisher: 'This is the publisher',
        publicationDate: '11/11/2023',
        bookId: 1,
        description: 'This is the description'
    }
    return (
        <Layout>
            <Container sx={{ paddingBottom: 5 }}>
                <Box sx={{ marginBottom: 3 }}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ backgroundColor: 'white', padding: 1 }}>
                        <Link underline="hover" color="inherit" href="#">
                            Home
                        </Link>
                        <Link underline="hover" color="inherit" href="#">
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
                            src={'https://nash-book.s3.ap-southeast-1.amazonaws.com/action.PNG'}
                            alt="Book Image"
                        />
                    </Grid>

                    <Grid item lg={7} xs={12} sx={{ marginBottom: 3 }}>
                        <Box sx={{ height: '100%', backgroundColor: 'white'}}>
                            <Box sx={{p:3}}>
                            <Typography variant="h4" gutterBottom>
                                {book?.title}
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
                                <strong>Publication Date:</strong> {book?.publicationDate}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                                {/* <Typography variant="body1" sx={{ marginRight: 2 }}>
                                    <strong>Quantity:</strong>
                                </Typography>
                                <TextField
                                    type="number"
                                    defaultValue={1}
                                    inputProps={{ min: 1 }}
                                    sx={{ width: '130px', marginRight: 2 }}
                                /> */}
                                {/* <Button
                                    variant="contained"
                                    sx={{backgroundColor: "#ffc800", color: '#3D464D'}}
                                    startIcon={<ShoppingCartIcon />}
                                    href={`/Cart/AddCart?bookId=${book?.bookId}`}
                                >
                                    Add To Cart
                                </Button> */}
                                <Button variant="contained" startIcon={<FavoriteBorderIcon />} sx={{backgroundColor: "#ffc800", color: '#3D464D', textTransform: 'unset'}}>
                                    Add To Reservations List
                                </Button>
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
        </Layout>
    );
};

export default BookDetail;
