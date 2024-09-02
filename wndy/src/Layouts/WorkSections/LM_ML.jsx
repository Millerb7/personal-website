import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { SectionBox } from '../SectionBox';

export const LockheedMartinDetail = () => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = (pdf) => {
    setNumPages(pdf.numPages);
  };

  // Initialize the default layout plugin
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
      <Typography variant="h4" gutterBottom className="permanent-marker-regular">
        Lockheed Martin ML App – X-RAY Weld Flaw Detection App
      </Typography>
      <Typography variant="body1" gutterBottom>
        The Lockheed Martin ML App was a complex project focused on detecting microscopic weld flaws in X-ray images using machine learning. The challenges were significant, particularly because we inherited the project from an uncooperative previous team. The initial handoff was difficult, with the original team being unresponsive and unhelpful, leading to substantial delays. Despite these setbacks, I took the initiative to plan meetings, reach out to individuals directly, and ultimately got the old model working.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Challenges:</strong> The previous team had left behind a codebase that was fragmented and poorly integrated. The React app’s front end was entirely hard-coded, with no real interaction between pages. API routes were non-functional, merely auto-returning results without pinging the backend. The old team’s promises about deliverables were also misleading, leaving us to shoulder more responsibility than initially anticipated.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Solutions:</strong> During the second sprint, I focused on fixing the existing codebase. This involved making significant modifications to the React front end to ensure that the UI was both functional and aligned with the expectations of my supervisor. Concurrently, I revamped the Flask backend to establish a proper connection to the machine learning model and frontend, allowing the program to function as intended.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Outcomes:</strong> By the end of the project, I successfully deployed the application as a standalone end-to-end desktop app. The application was not only functional but also met the UI and capability requirements laid out by the project stakeholders. The machine learning model, now properly integrated, provided reliable outputs, enhancing the app's utility in real-world scenarios.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Below is the detailed project report in PDF format:
      </Typography>
      <Box sx={{ marginY: 2, height: '100%', maxHeight: '75vh', overflow: 'auto' }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl="/docs/ExpoPoster.pdf"
            plugins={[defaultLayoutPluginInstance]}
            onDocumentLoad={onDocumentLoadSuccess}
          />
        </Worker>
      </Box>
    </>
  );
};
