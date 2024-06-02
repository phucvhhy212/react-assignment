import { Box, Card, CardContent, CardMedia, Container, Grid, Rating, Typography } from "@mui/material";
import Title from "./Title";

export default function FeaturedBook() {
  const cards = [
    { id: 1, title: "Dance With The Devils", author: "By Kit Rocha", rating: 2.5 },
    { id: 2, title: "Dance With The Devils", author: "By Kit Rocha", rating: 2.5 },
    { id: 3, title: "Dance With The Devils", author: "By Kit Rocha", rating: 2.5 },
    { id: 4, title: "Dance With The Devils", author: "By Kit Rocha", rating: 2.5 },
    { id: 5, title: "Dance With The Devils", author: "By Kit Rocha", rating: 2.5 }
  ];

  return (
    <Container>
      <Title title="Featured Books"></Title>
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.id}>
            <Card sx={{ maxWidth: '100%' }}>
              <CardMedia
                component="img"
                image="https://nash-book.s3.ap-southeast-1.amazonaws.com/action.PNG"
                alt="Paella dish"
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component={'a'}
                  href="#"
                  fontWeight={600}
                  sx={{
                    textDecoration: 'none',
                    color: '#3D464D',
                    '&:hover': {
                      color: '#FFD333'
                    }
                  }}
                >
                  {card.title}
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
                <Rating name="half-rating" defaultValue={card.rating} precision={0.5} size="small" readOnly />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
