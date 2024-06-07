import { Box, Card, CardContent, CardMedia, Container, Grid, Rating, Typography } from "@mui/material";
import Title from "./Title";
import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import { toast } from "react-toastify";

export default function FeaturedBook() {
  const [cards,setCards] = useState()
  useEffect(() => {
    getBooks()
      .then(res => setCards(res.data.body))
      .catch(e => toast.error("Server error"))
},[]) 

  return (
    <Container>
      <Title title="Featured Books"></Title>
      <Grid container spacing={2}>
        {cards?.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.id}>
            <Card sx={{ maxWidth: '100%' }}>
              <CardMedia
                component="img"
                image={card.image}
                alt="Paella dish"
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component={'a'}
                  href={`/book/${card.id}`}
                  fontWeight={600}
                  sx={{
                    textDecoration: 'none',
                    color: '#3D464D',
                    '&:hover': {
                      color: '#FFD333'
                    }
                  }}
                >
                  {card.name}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  color="text.secondary"
                  component={'div'}
                  marginTop={1}
                >
                  {card.author}
                </Typography>
                <Rating name="half-rating" defaultValue={3} precision={0.5} size="small" readOnly />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
