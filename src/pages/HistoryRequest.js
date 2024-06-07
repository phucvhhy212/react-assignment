import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Collapse,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Layout from '../components/Layout';
import { toast } from 'react-toastify';
import { getBorrowingHistory } from '../services/borrowingRequestService';
import { jwtDecode } from 'jwt-decode';

export default function HistoryRequest() {
    const [expanded, setExpanded] = useState([]);
    const [requestHistory,setRequestHistory] = useState()
    const handleExpandClick = (id) => {
        setExpanded((prevExpanded) =>
            prevExpanded.includes(id)
                ? prevExpanded.filter((expandedId) => expandedId !== id)
                : [...prevExpanded, id]
        );
    };
    useEffect(() => {
        var decodedToken = jwtDecode(localStorage.getItem("token"))
        getBorrowingHistory(decodedToken.userId).then(res => {
            if(res.data.statusCode === 200){
                setRequestHistory(res.data.body)
            }
        }).catch(e => {console.log(e); toast.error("Server error")})
    },[])

    return (
        <Layout>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="div">
                            Borrowing History
                        </Typography>
                        <Typography variant="body2" color="textSecondary" align="right">
                            Total {requestHistory?.length} times
                        </Typography>
                    </Grid>

                    {requestHistory?.map(item => (
                        <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1" fontWeight={600}>
                                            Request Date: {item.dateRequested.slice(0,10)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body2">Number of book(s): {item.details.length}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body2">Status: {item.status}</Typography>
                                    </Grid>
                                    <Grid item xs="auto">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{backgroundColor: '#FFD333', color: '#3D464D'}}
                                            onClick={()=>handleExpandClick(item.id)}
                                            endIcon={<ExpandMoreIcon />}
                                        >
                                            Show Details
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Collapse in={expanded.includes(item.id)} timeout="auto" unmountOnExit>
                                    <Typography variant="h6" gutterBottom>
                                        Detail Order:
                                    </Typography>
                                    <List>
                                        {item.details.map(item => (
                                            <ListItem>
                                            <ListItemAvatar>
                                                <Avatar
                                                    variant="square"
                                                    src={item.image}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.name}
                                                secondary={item.author}
                                            />
                                        </ListItem>
                                        ))}
                                        
                                    </List>
                                </Collapse>
                            </CardContent>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                <div className="back-to-shop">
                    <a href="/">←</a>
                    <Typography variant="body2" component={'a'} href='/' sx={{textDecoration: 'none'}} color="textSecondary">
                        Back to Home
                    </Typography>
                </div>
            </Container>
        </Layout>
    );
};

