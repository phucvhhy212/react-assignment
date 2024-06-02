import { Box, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import Title from "./Title";

export default function Categories() {
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
                <Card sx={{
                    display: 'flex', height: 100, width: '30%', textDecoration: 'none',
                    '&:hover': {
                        backgroundColor: '#FFD333'
                    }
                }} component={'a'} href='#'>
                    <CardMedia
                        component="img"
                        image="https://nash-book.s3.ap-southeast-1.amazonaws.com/action.PNG"
                        alt="Live from space album cover"
                        sx={{ width: "100px", objectFit: 'fill' }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h6">
                                Adventure
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                6 books
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            </Box>
        </Container>
    )
}