import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Select, MenuItem, TextField, Divider, Box } from '@mui/material';
import Layout from '../components/Layout';
import { deleteUserRequest, getUserRequest } from '../services/userRequestService';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { useCountBookInRequestContext } from '../context/countBookInRequestContext';
import { createBorrowingRequest } from '../services/borrowingRequestService';


const BorrowingRequestBackground = () => {
    const [userRequest, setUserRequest] = useState()
    const [requester, setRequester] = useState("")
    const { requestCount, setRequestCount } = useCountBookInRequestContext()
    
    useEffect(() => {
        const decodedToken = jwtDecode(localStorage.getItem("token"));
        setRequester(decodedToken.userName)
        getUserRequest().then(res => {
            if (res.data.statusCode === 200) {
                setUserRequest(res.data.body)
            }
            else {
                toast.error(res.data.message)
            }
        }).catch(e => toast.error("Server error"))
    }, [requestCount])
    const handleRemoveFromCart = (id) => {
        deleteUserRequest(id).then(res => {
            if (res.data.statusCode === 200) {
                toast.success(res.data.message)
                setRequestCount(requestCount-1)
            }
            else {
                toast.error(res.data.message)
            }
        }).catch(e => {console.log(e); toast.error("Server error")})
    }
    const handleCreateBorrowingRequest = () => {
        const decodedToken = jwtDecode(localStorage.getItem("token"))
        const params = {
            books: userRequest?.map(item => item.bookId),
            dateRequested: new Date().toISOString().slice(0, 10),
            requesterId: decodedToken.userId
        }
        createBorrowingRequest(params).then(res => {
            if(res.data.statusCode === 200) {
                toast.success("Create request successfully")
                setRequestCount(0)
            }
            else{
                toast.error(res.data.message)
            }
        }).catch(e => {console.log(e); toast.error("Server error")})
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    <Box mb={2}>
                        <Typography variant="h4"><b>Request Cart</b></Typography>
                        <Typography align="right" color="textSecondary">{requestCount} item</Typography>
                    </Box>
                    <Divider />
                    {userRequest?.map(item => (
                        <>
                            <Grid container alignItems="center" spacing={3} py={2}>
                                <Grid item xs={2}>
                                    <img src={item.bookImage} alt={item.bookName} style={{ width: '100%' }} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography color="textSecondary">{item.bookName}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography>{item.categoryName}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography>{item.author}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button onClick={() => handleRemoveFromCart(item.id)}>✕</Button>
                                </Grid>
                            </Grid>
                        </>
                    ))}
                    <Button href="/">Back to home</Button>
                </Grid>

                <Grid item md={4}>
                    <Typography variant="h5"><b>Summary</b></Typography>
                    <Divider />
                    <Grid container justifyContent="space-between" my={2}>
                        <Typography>ITEMS {requestCount}</Typography>
                    </Grid>
                    <Grid container justifyContent="space-between" alignItems="center" my={2}>
                        <Typography><b>Requestor</b></Typography>
                        <Typography><b>{requester}</b></Typography>
                    </Grid>
                    <Grid container justifyContent="space-between" alignItems="center" my={2}>
                        <Typography><b>Date Requested</b></Typography>
                        <Typography><b>{new Date().toDateString()}</b></Typography>
                    </Grid>
                    <Divider />
                    <Button disabled={requestCount===0} variant="contained" sx={{ backgroundColor: '#FFD333', color: '#3D464D' }} fullWidth onClick={() => handleCreateBorrowingRequest()}>PLACE REQUEST</Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default function BorrowingRequest() {

    return (
        <Layout>
            <BorrowingRequestBackground></BorrowingRequestBackground>
        </Layout >
    )
}