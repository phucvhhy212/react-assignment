import { Box, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import Title from "./Title";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useBookFilterContext } from "../context/bookFilterContext";

export default function Categories() {
    const {filter,setFilter,categoryId,setCategoryId} = useBookFilterContext()
    const navigate = useNavigate()
    const [categories,setCategories] = useState()
    useEffect(() => {
        getCategories({pageSize:15})
          .then(res => setCategories(res.data.body))
          .catch(e => toast.error("Server error"))
    },[])
    const handleOnClickCategory = (id) => {
        setCategoryId(id)
        setFilter("")
        navigate("/books")
    }
    return (
        <Container sx={{ paddingTop: '3rem' }}>
            <Title title="Categories"></Title>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        mr: 3,
                        mb: 3
                    },
                }}
            >
                {categories?.map(item => (
                    <Card sx={{
                        display: 'flex', height: 100, width: '30%', textDecoration: 'none',
                        '&:hover': {
                            backgroundColor: '#FFD333'
                        }
                    }} component={'a'} onClick={() => handleOnClickCategory(item.id)}>
                        <CardMedia
                            component="img"
                            image={item.image}
                            alt="Live from space album cover"
                            sx={{ width: "100px", objectFit: 'fill' }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h6">
                                {item.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                1 books
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
                ))}
                
            </Box>
        </Container>
    )
}