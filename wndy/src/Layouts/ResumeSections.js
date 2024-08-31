import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define a styled Box to create a square section with an outline
const SectionBox = styled(Box)(({ theme }) => ({
  border: '3px solid black',
  borderRadius: '8px',
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  boxShadow: '4px 4px 0px 0px #000',
  backgroundColor: '#fffbe7',
  width: '100%',  // Takes full width of its container
  maxWidth: '300px',  // Optional max width to control stretching
  height: 'auto',  // Adjusts height based on content
}));


// Header Component
export const HeaderSection = () => (
  <SectionBox>
    <Typography variant="h4" align="center" gutterBottom>
      Miller Boyd
    </Typography>
    <Typography variant="body1" align="center">
      Dallas, Tx | (972) 989-3778 | <a href="mailto:mjboyd@smu.edu">mjboyd@smu.edu</a> | 
      <a href="https://www.linkedin.com/in/miller-compsci/"> linkedin.com/in/miller-compsci/</a> | 
      <a href="http://wndy.lol"> Dev Site: wndy.lol</a>
    </Typography>
  </SectionBox>
);

// Languages and Tools Component
export const LanguagesToolsSection = () => (
  <SectionBox>
    <Typography variant="h4" gutterBottom>
      Proficient Languages and Tools
    </Typography>
    <Typography variant="body1">
      Java, C++, C, C#, Python, JavaScript ES6+, HTML5, React, NodeJS, SQL, NoSQL, MongoDB, MATLAB, Swift, AWS, Jira
    </Typography>
  </SectionBox>
);

// Education Component
export const EducationSection = () => (
  <SectionBox>
    <Typography variant="h4" gutterBottom>
      Education
    </Typography>
    <Typography variant="body1">
      <strong>Southern Methodist University</strong>, B.S. Computer Science – 3.3 GPA, Jan 2022 – Current <br />
      <strong>UCF Full Stack Web Development Program</strong>, Certificate, Jun 2021 – Sep 2021 <br />
      <strong>Blinn College</strong>, B.S. Computer Science – 3.64 GPA, Jan 2020 – Dec 2021 <br />
      <strong>University of Texas at Arlington - Honors College</strong>, B.S. Computer Science – 3.24 GPA, Aug 2018 – Dec 2020
    </Typography>
  </SectionBox>
);

// Experience Component
// Lockheed Martin ML App Experience Component
export const LockheedMartinExperience = () => (
  <SectionBox>
    <Typography variant="h4" gutterBottom>
      Lockheed Martin ML App – X-RAY Weld Flaw Detection App
    </Typography>
    <Typography variant="body1">
      Jan 2024 – May 2024 <br />
      Dev Stack: Keras, Python, Flask, Pyinstaller, React, Electron, Material UI <br />
      Full-stack application for Lockheed Martin to detect microscopic weld flaws in X-ray images...
    </Typography>
  </SectionBox>
);

// Connect 4 AI Experience Component
export const Connect4AIExperience = () => (
  <SectionBox>
    <Typography variant="h4" gutterBottom>
      Connect 4 AI
    </Typography>
    <Typography variant="body1">
      Apr 2024 <br />
      Dev Stack: Python, NumPy <br />
      AI agent for playing Connect 4 using bitwise operations for efficiency...
    </Typography>
  </SectionBox>
);

// iOS Machine Learning App – Dallas Zoo Experience Component
export const DallasZooExperience = () => (
  <SectionBox>
    <Typography variant="h4" gutterBottom>
      iOS Machine Learning App – Dallas Zoo Animal Identifier
    </Typography>
    <Typography variant="body1">
      Aug 2023 – Dec 2023 <br />
      Dev Stack: Objective-C, Swift, Python, Tornado, PyTorch <br />
      Proof-of-concept iOS app for the Dallas Zoo that captures audio and identifies the animal...
    </Typography>
  </SectionBox>
);

// 3DVR UI Research Project Experience Component
export const VRUIResearchExperience = () => (
  <SectionBox>
    <Typography variant="h4" gutterBottom>
      3DVR UI Research Project – Hand Gesture UI Interaction
    </Typography>
    <Typography variant="body1">
      Mar 2023 – May 2023 <br />
      Dev Stack: Unity, C# <br />
      Developed a 3D UI package for VR exploring glassmorphism and intuitive gestural inputs...
    </Typography>
  </SectionBox>
);

// CS 3330 Full Stack Semester Project Experience Component
export const FarmHandExperience = () => (
  <SectionBox>
    <Typography variant="h4" gutterBottom>
      CS 3330 Full Stack Semester Project – Farm Hand
    </Typography>
    <Typography variant="body1">
      Jan 2022 – May 2022 <br />
      Dev Stack: MySQL, Express, NodeJS, JavaScript, React, Material UI <br />
      Built an app for managing and trading livestock with a chat feature...
    </Typography>
  </SectionBox>
);

// Relevant Courses Component
export const CoursesSection = () => (
  <SectionBox>
    <Typography variant="h4" gutterBottom>
      Relevant Courses
    </Typography>
    <Typography variant="body1">
      Machine Learning, Artificial Intelligence, Digital Computer Design, Software & Project Management, Cloud Computing, 
      Mobile Apps & Sensing, Software Engineering, Operating Systems, Database Concepts, Virtual and Augmented Reality, 
      Fundamentals of Algorithms, Digital Logic Design, Differential Equations, Computer Networks and Systems
    </Typography>
  </SectionBox>
);

// Organizations Component
export const OrganizationsSection = () => (
  <SectionBox>
    <Typography variant="h4" gutterBottom>
      Organizations
    </Typography>
    <Typography variant="body1">
      <strong>SMU Esports Club</strong>, Member, Aug 2022 – Present <br />
      <strong>SMU Computer Science Club</strong>, Member, Jan 2022 – Present <br />
      <strong>SMU Cybersecurity Club</strong>, Member, Jan 2022 – Present
    </Typography>
  </SectionBox>
);

// DownloadResume Component
export const DownloadResumeSection = () => (
  <SectionBox>
    <Typography variant="h4" gutterBottom>
      Download Resume
    </Typography>
    <Typography variant="body1">
      <a href="/docs/Miller_Boyd_Resume.pdf" download>
        Click here to download my resume.
      </a>
    </Typography>
  </SectionBox>
);

// DownloadCoverLetter Component
export const DownloadCoverLetterSection = () => (
  <SectionBox>
    <Typography variant="h4" gutterBottom>
      Download Cover Letter
    </Typography>
    <Typography variant="body1">
      <a href="/docs/Miller_Boyd_Cover_Letter.pdf" download>
        Click here to download my cover letter.
      </a>
    </Typography>
  </SectionBox>
);
