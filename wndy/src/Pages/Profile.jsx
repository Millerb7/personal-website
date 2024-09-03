import React from "react";
import { Container, Box, Typography, Avatar, Divider, Grid } from "@mui/material";
import styled from "@mui/material/styles/styled";
import ResumeDrawingBar from "../Tools/Bars/ResumeBar";

// Styled component for the profile box to appear like it's pinned or written on a whiteboard
const ProfileBox = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.85)", // Slightly transparent to blend with the whiteboard
  padding: theme.spacing(3),
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow to make it look like it's slightly lifted off the board
  margin: "auto",
  position: "relative",
  maxWidth: "800px",
}));

// Marker-style font for the name and headings
const MarkerTypography = styled(Typography)(({ theme }) => ({
  fontFamily: '"Permanent Marker", cursive', // Marker-style font
  color: "#333",
}));

export const Profile = () => {
  return (
    <Container sx={{ position: "relative", mt: 4 }}>
      <ProfileBox>
        <Avatar
          alt="Miller Boyd"
          src="../../public/images/thorfinn.jpg"
          sx={{
            width: 100,
            height: 100,
            margin: "auto",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            border: "2px solid #000", // Simulate a border around the image
          }}
        />
        <MarkerTypography variant="h4" align="center" gutterBottom>
          Miller Boyd
        </MarkerTypography>
        <MarkerTypography variant="h6" align="center" gutterBottom>
          Full Stack Developer | Machine Learning Enthusiast | Passionate Engineer
        </MarkerTypography>
        <Divider sx={{ marginY: 4, borderColor: "#000" }} />

        <Box mb={4}>
          <MarkerTypography variant="h5" gutterBottom>
            Who am I
          </MarkerTypography>
          <Typography variant="body1">
            Computer scientist who has been building full stack applications for years now.
          </Typography>
        </Box>

        <Box mb={4}>
          <MarkerTypography variant="h5" gutterBottom>
            Additional Information
          </MarkerTypography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MarkerTypography variant="h6">Hobbies</MarkerTypography>
              <Typography variant="body1">List your hobbies here.</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MarkerTypography variant="h6">Contact Information</MarkerTypography>
              <Typography variant="body1">Include your contact details, like email or social media links.</Typography>
            </Grid>
          </Grid>
        </Box>
      </ProfileBox>
      <ResumeDrawingBar></ResumeDrawingBar>
    </Container>
  );
};
