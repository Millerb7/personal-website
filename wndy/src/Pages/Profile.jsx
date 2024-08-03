import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Avatar, Divider, Grid } from "@mui/material";



export const Profile = () => {
  useEffect(() => {

  }, []);

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Avatar
          alt="me fr"
          src="../../public/images/thorfinn.jpg"
          sx={{ width: 100, height: 100, margin: "auto" }}
        />
        <Typography variant="h4" align="center" gutterBottom>
          Miller Boyd
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
            Full Stack Developer | Machine Learning Enthusiast | Passionate Engineer
        </Typography>
        <Divider sx={{ marginY: 4 }} />

        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Who am I
          </Typography>
          <Typography variant="body1">
            Computer scientist who has been building full stack applications for years now. 
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Additional Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Hobbies</Typography>
              <Typography variant="body1">List your hobbies here.</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Contact Information</Typography>
              <Typography variant="body1">Include your contact details, like email or social media links.</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
