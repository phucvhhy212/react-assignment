import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { LocationOn, Email, Phone, Twitter, Facebook, LinkedIn, Instagram } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#3D464D', color: 'white', mt: 5, pt: 5 }}>
      <Container maxWidth="xl">
        <Grid container spacing={5} pt={5}>
          <Grid item lg={3} md={12} mb={5}>
            {/* Empty space to match the original layout */}
          </Grid>
          <Grid item lg={4} md={12} mb={5}>
            <Typography variant="h5" textTransform="uppercase" mb={4} fontWeight={600}>Get In Touch</Typography>
            <Typography variant="body2" mb={2}>
              <LocationOn sx={{ mr: 1, color: '#FFD333' }} />
              123 Street, Tay Son, Ha Noi
            </Typography>
            <Typography variant="body2" mb={2}>
              <Email sx={{ mr: 1, color: '#FFD333' }} />
              tuannd@gmail.com
            </Typography>
            <Typography variant="body2" mb={0}>
              <Phone sx={{ mr: 1, color: '#FFD333' }} />
              0876585372
            </Typography>
          </Grid>
          <Grid item md={4} mb={5}>
            <Typography variant="h5" textTransform="uppercase" mb={4} fontWeight={600}>Follow Us</Typography>
            <Box sx={{ display: 'flex' }}>
              <IconButton color="primary" href="https://localhost:7102/#" sx={{ mr: 1 }}>
                <Twitter />
              </IconButton>
              <IconButton color="primary" href="https://localhost:7102/#" sx={{ mr: 1 }}>
                <Facebook />
              </IconButton>
              <IconButton color="primary" href="https://localhost:7102/#" sx={{ mr: 1 }}>
                <LinkedIn />
              </IconButton>
              <IconButton color="primary" href="https://localhost:7102/#">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Grid container borderTop={1} borderColor="rgba(256, 256, 256, .1)" py={4}>
          <Grid item md={6} textAlign={{ xs: 'center', md: 'left' }}>
            <Typography variant="body2" fontWeight={600}>
              All Rights Reserved.
            </Typography>
          </Grid>
          <Grid item md={6} textAlign={{ xs: 'center', md: 'right' }}>
            <img src="./Home page - Book Shop_files/payments.png" alt="" style={{ maxWidth: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}