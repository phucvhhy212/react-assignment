import React, { useEffect, useState } from 'react';
import { Container, Grid, Breadcrumbs, Link, Typography, Button, Box, Paper, Tabs, Tab, Rating, Card, CardMedia, CardContent, CardActions, FormGroup, FormControlLabel, Checkbox, Pagination } from '@mui/material';

import { getBooks } from '../services/bookService';
import Layout from '../components/Layout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import SearchIcon from '@mui/icons-material/Search';
import Title from '../components/Title';

// export default function Book() {
//     const [books, setBooks] = useState([])
//     const [totalItem, setTotalItem] = useState(0)
//     const [pageSize, setPageSize] = useState(5)
//     const [currentPage, setCurrentPage] = useState(1)
//     const [sortOrder, setSortOrder] = useState('asc')
//     const [sortBy, setSortBy] = useState('')
//     const [name, setName] = useState('')

//     const handleOnChangePageSize = (e) => {
//         setPageSize(e.target.value)
//         setCurrentPage(1)
//     }

//     const handleOnSearch = (value) => {
//         setName(value)
//         setCurrentPage(1)
//     }

//     const handleOnChangeSortOrder = (key, order) => {
//         setSortBy(key)
//         setSortOrder(order)
//     }
//     useEffect(() => {
//         const params = {
//             currentPage,
//             pageSize,
//             name,
//             sortOrder,
//             sortBy
//         }
//         getBooks(params).then(response => {
//             setBooks(response.data.body);
//             return response
//         }).then(response => setTotalItem(response.data.total))
//     }, [pageSize, currentPage, name, sortBy, sortOrder])


//     return (
//         <div className='p-4'>
//             <h2 className='mb-4'>Books</h2>
//             <Button className='btn btn-secondary mb-4'>Create New</Button>
//             <div className="d-flex">
//                 <div className="me-auto">
//                     <div>
//                         <select name="example_length" aria-controls="example" id="dt-length-0" onChange={(e) => handleOnChangePageSize(e)}>
//                             <option selected={pageSize === 5} value="5">5</option>
//                             <option selected={pageSize === 10} value="10">10</option>
//                             <option selected={pageSize === 15} value="15">15</option>
//                             <option selected={pageSize === 20} value="20">20</option>
//                         </select>
//                         <label htmlFor="dt-length-0"> entries per page</label>
//                     </div>
//                 </div>
//                 <div className="dt-layout-cell dt-end ">
//                     <div className="dt-search">
//                         <label htmlFor="dt-search-0">Search:</label>
//                         <input onChange={(e) => handleOnSearch(e.target.value)} type="search" className="dt-input" id="dt-search-0" placeholder="" aria-controls="example" />
//                     </div>
//                 </div>
//             </div>
//             <Table responsive>
//                 <thead>
//                     <tr>
//                         {books.length !== 0 && Object.keys(books[0]).map(key =>
//                             <th key={key}>{key}
//                                 <span>
//                                     <i onClick={() => handleOnChangeSortOrder(key, "asc")} className="ti ti-arrow-up"></i>
//                                     <i onClick={() => handleOnChangeSortOrder(key, "desc")} className="ti ti-arrow-down"></i>
//                                 </span>
//                             </th>
//                         )}
//                         <th>action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {books.map(book =>
//                         <tr key={book.id}>
//                             <td>{book.id}</td>
//                             <td>{book.name}</td>
//                             <td>{book.description}</td>
//                             <td>
//                                 <i className='ti ti-eye me-3'></i>
//                                 <i className='ti ti-pencil me-3'></i>
//                                 <i className='ti ti-trash'></i>
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </Table>
//             <div className='d-flex'>
//                 <div className='me-auto'>Showing {(currentPage - 1) * pageSize + 1} to {totalItem < pageSize * currentPage ? totalItem : pageSize * currentPage} of {totalItem} entries</div>

//                 <Pagination className='text-right'>
//                     <Pagination.First onClick={() => setCurrentPage(1)} />
//                     <Pagination.Prev disabled={currentPage == 1} onClick={() => setCurrentPage(currentPage - 1)} />
//                     {
//                         Array.from({ length: Math.ceil(totalItem / pageSize) }).map((it, index) => <Pagination.Item key={index} onClick={(e) => { setCurrentPage(e.target.text) }} active={currentPage == index + 1}>{index + 1}</Pagination.Item>)
//                     }
//                     <Pagination.Next disabled={currentPage === Math.ceil(totalItem / pageSize)} onClick={() => setCurrentPage(currentPage + 1)} />
//                     <Pagination.Last onClick={() => setCurrentPage(Math.ceil(totalItem / pageSize))} />
//                 </Pagination>
//             </div>
//         </div>
//     )
// }
export default function Book() {
    const categories = [
        {
            id: 1,
            name: "Cate A"
        },
        {
            id: 2,
            name: "Cate B"
        },
        {
            id: 3,
            name: "Cate C"
        }
    ]

    const books = [
        {
            id: 1,
            title: 'Title A',
            image: 'https://nash-book.s3.ap-southeast-1.amazonaws.com/action.PNG',
            author: 'Kit',
            rating: 4
        },
        {
            id: 2,
            title: 'Title B',
            image: 'https://nash-book.s3.ap-southeast-1.amazonaws.com/action.PNG',
            author: 'Kit',
            rating: 4
        },
    ]
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [page, setPage] = useState(1);

    const handlePageChange = (event, value) => {
        setPage(value);
    };
    return (
        <Layout>
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
                                <form id="f1" action="/Book/Search" method="GET">
                                    <FormGroup>
                                        {categories.map((category) => (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        value={category.id}
                                                        checked={selectedCategories === category.id}
                                                        onChange={() => setSelectedCategories(category.id)}
                                                    />
                                                }
                                                label={category.name}
                                                key={category.id}
                                            />
                                        ))}
                                    </FormGroup>
                                    <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 3, backgroundColor: "#ffc800", color: '#3D464D', textTransform: 'unset', fontWeight: '600' }}>
                                        Filter
                                    </Button>
                                </form>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item lg={9} md={8}>
                        <Grid container spacing={3}>
                            {books.map((book) => (
                                <Grid item lg={4} md={6} sm={6} xs={12} key={book.id}>
                                    <Card>
                                        <CardMedia component="img" height="200" image={book.image} alt={book.title} />
                                        <CardContent sx={{ textAlign: 'center' }}>
                                            {/* <Link href={`/Book/Detail/${book.id}`} underline="none"> */}
                                            <Typography component={'a'} href='#' variant="h6" noWrap sx={{
                                                color: '#3D464D', textDecoration: 'none', '&:hover': {
                                                    color: '#FFD333'
                                                }
                                            }}>
                                                {book.title}
                                            </Typography>
                                            {/* </Link> */}
                                            <Typography variant="body1">{book.author}</Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
                                                {/* {[...Array(book.rating)].map((_, index) => (
                                                    <Typography key={index} component="span" sx={{ color: 'primary.main' }}>
                                                        ★
                                                    </Typography>
                                                ))} */}
                                                {/* {[...Array(5 - book.rating)].map((_, index) => (
                                                    <Typography key={index} component="span" sx={{ color: 'primary.main' }}>
                                                        ☆
                                                    </Typography>
                                                ))} */}
                                                <Rating name="half-rating" defaultValue={book.rating} precision={0.5} size="medium" readOnly />

                                            </Box>
                                            <Typography variant="body2" sx={{ marginTop: 1 }}>
                                                {book.stock} left
                                            </Typography>
                                        </CardContent>
                                        {/* <CardActions sx={{ justifyContent: 'center' }}>
                                            <Button size="small" color="primary" startIcon={<ShoppingCartIcon />} href={`appointmentListCart?action=addToCart&bookId=${book.id}`}>
                                                Add to Cart
                                            </Button>
                                            <Button size="small" color="primary" startIcon={<FavoriteBorderIcon />} href={`myReservation?action=addToReservationList&bookId=${book.id}`}>
                                                Add to Reservations
                                            </Button>
                                            <Button size="small" color="primary" startIcon={<SyncAltIcon />}>
                                                Sync
                                            </Button>
                                            <Button size="small" color="primary" startIcon={<SearchIcon />}>
                                                Search
                                            </Button>
                                        </CardActions> */}
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                            <Pagination count={10} page={page} onChange={handlePageChange} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}