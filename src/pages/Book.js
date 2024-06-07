import React, { useEffect, useState } from 'react';
import { Container, Grid, Breadcrumbs, Link, Typography, Button, Box, Paper, Tabs, Tab, Rating, Card, CardMedia, CardContent, CardActions, FormGroup, FormControlLabel, Checkbox, Pagination } from '@mui/material';

import { getBooks, getBooksByCategoryId } from '../services/bookService';
import Layout from '../components/Layout';
import { getCategories } from '../services/categoryService';
import { toast } from 'react-toastify';
import { BookFilterProvider, useBookFilterContext } from '../context/bookFilterContext';


const BookBackground = () => {
    const {filter,setFilter,categoryId,setCategoryId} = useBookFilterContext()
    const [categories, setCategories] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItem, setTotalItem] = useState(0)
    const [books, setBooks] = useState()
    useEffect(() => {
        getCategories({pageSize:15})
            .then(res => setCategories(res.data.body))
            .catch(e => toast.error("Server error"))
    }, [])
    useEffect(() => {
        const params = {
            currentPage,
            filter,
            categoryId
        }
        getBooksByCategoryId(params)
            .then(res => {setBooks(res.data.body); return res})
            .then(res => setTotalItem(res.data.total))
            .catch(e => toast.error("Server error"))
    }, [currentPage, filter, categoryId])



    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    return (
        <Container maxWidth="xl" sx={{ paddingBottom: 5 }}>
                <Grid container spacing={5} sx={{ paddingX: 5 }}>
                    <Grid item lg={3} md={4}>
                        <Box sx={{ p: 3, marginBottom: 3, pt: 0 }}>
                            <Box
                                component="h2"
                                className="section-title"
                                mt={0}
                                sx={{
                                    position: 'relative',
                                    textTransform: 'uppercase',
                                    '&::after': {
                                        position: 'absolute',
                                        content: '""',
                                        width: '100%',
                                        height: '0',
                                        top: '50%',
                                        left: '0',
                                        borderTop: '1px dashed #bec5cb',
                                        zIndex: '-1'
                                    }
                                }}
                            >
                                <Typography
                                    component="span"
                                    variant="h7"
                                    sx={{
                                        display: 'inline-block',
                                        paddingRight: 1,
                                        color: '#3D464D',
                                        fontWeight: 600, backgroundColor: '#F5F5F5'
                                    }}
                                >
                                    Filter by category
                                </Typography>
                            </Box>
                            <Box p={2} sx={{ backgroundColor: 'white' }}>
                                <FormGroup>
                                    <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value={""}
                                                    checked={!categoryId}
                                                    onChange={() => setCategoryId("")}
                                                />
                                            }
                                            label={"All Book"}
                                            key={""}
                                    />
                                    {categories?.map((category) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value={category.id}
                                                    checked={categoryId === category.id}
                                                    onChange={() => setCategoryId(category.id)}
                                                />
                                            }
                                            label={category.name}
                                            key={category.id}
                                        />
                                    ))}
                                </FormGroup>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item lg={9} md={8}>
                        <Grid container spacing={3}>
                            {books?.map((book) => (
                                <Grid item lg={4} md={6} sm={6} xs={12} key={book.id}>
                                    <Card>
                                        <CardMedia component="img" height="200" image={book.image} alt={book.name} />
                                        <CardContent sx={{ textAlign: 'center' }}>
                                            <Typography component={'a'} href={`/book/${book.id}`} variant="h6" noWrap sx={{
                                                color: '#3D464D', textDecoration: 'none', '&:hover': {
                                                    color: '#FFD333'
                                                }
                                            }}>
                                                {book.name}
                                            </Typography>
                                            <Typography variant="body1">{book.author}</Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
                                                <Rating name="half-rating" defaultValue={3} precision={0.5} size="medium" readOnly />

                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                            <Pagination count={Math.ceil(totalItem / 3)} page={currentPage} onChange={handlePageChange} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
    )
}

export default function Book() {
    return (
        // <BookFilterProvider>
            <Layout>
                <BookBackground></BookBackground>
            </Layout>
        // </BookFilterProvider>
    )
}