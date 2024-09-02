import React from 'react';
import { Box, Typography } from '@mui/material';

import { SectionBox } from '../SectionBox';

export const DallasZooDetail = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom className="permanent-marker-regular">
        Dallas Zoo Scavenger Hunt App
      </Typography>
      <Typography variant="body1" gutterBottom>
        The Dallas Zoo Scavenger Hunt app was a two-week project aimed at creating an interactive and educational tool for children visiting the Dallas Zoo. The goal was to develop a simple, intuitive app that engaged young users in a scavenger hunt, enhancing their zoo experience through technology. The design and functionality were crafted to be straightforward and easy to navigate, keeping the target audience of children on field trips in mind.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>UI/UX Design:</strong> The app’s design centered around a colorful and playful interface, aligning with the Dallas Zoo's branding. A single-page application (SPA) model was chosen to minimize complexity, allowing all necessary actions to be performed from one screen.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Technical Challenges:</strong> Implementing a machine learning (ML) model for identifying animals based on audio recordings was a key challenge. Initially, we used Fast Fourier Transforms (FFTs) and binary classification but needed more accuracy. We introduced a circular buffer to handle audio data more efficiently and experimented with various audio processing techniques.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Advanced Audio Analysis:</strong> To improve accuracy, we expanded our audio feature set to include pitch detection, Zero Crossing Rate (ZCR), spectral centroid, and other spectral features. We transitioned to generating spectrograms, which significantly enhanced the ML model's classification accuracy.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Model Training and Integration:</strong> The ML model was trained using a dataset of zoo animal sounds. Several iterations were necessary to refine the model’s architecture and input features, ultimately achieving around 80% accuracy. The backend, built on a Python-based Flask server, handled real-time API calls and ensured smooth communication with the frontend.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Outcomes and Impact:</strong> The app was well-received by children and educators alike. It provided an engaging, educational experience that complemented the zoo visit. The project also served as a valuable learning experience in ML, audio processing, and real-time data handling.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Below are some images and a video demonstrating the app:
      </Typography>
      <Box sx={{ marginY: 2 }}>
        {/* Add image and video embeds here */}
      </Box>
    </>
  );
};
