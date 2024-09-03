import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';


// Header Component
export const HeaderSection = () => (
  <>
    <Typography variant="h4" align="center" gutterBottom>
      Miller Boyd
    </Typography>
    <Typography variant="body1" align="center">
      Dallas, Tx | (972) 989-3778 | <a href="mailto:mjboyd@smu.edu">mjboyd@smu.edu</a> | 
      <a target="_blank" href="https://www.linkedin.com/in/miller-compsci/"> linkedin.com/in/miller-compsci/</a> | 
      <a target="_blank" href="http://wndy.lol"> Dev Site: wndy.lol</a>
    </Typography>
  </>
);

// Languages and Tools Component
export const LanguagesToolsSection = () => (
  <>
    <Typography variant="h4" gutterBottom>
      Proficient Languages and Tools
    </Typography>
    <Typography variant="body1">
      Java, C++, C, C#, Python, JavaScript ES6+, HTML5, React, NodeJS, SQL, NoSQL, MongoDB, MATLAB, Swift, AWS, Jira
    </Typography>
  </>
);

// Education Component
export const EducationSection = () => (
  <>
    <Typography variant="h4" gutterBottom>
      Education
    </Typography>
    <Typography variant="body1">
      <strong>Southern Methodist University</strong>, B.S. Computer Science – 3.3 GPA, Jan 2022 – Current <br />
      <strong>UCF Full Stack Web Development Program</strong>, Certificate, Jun 2021 – Sep 2021 <br />
      <strong>Blinn College</strong>, B.S. Computer Science – 3.64 GPA, Jan 2020 – Dec 2021 <br />
      <strong>University of Texas at Arlington - Honors College</strong>, B.S. Computer Science – 3.24 GPA, Aug 2018 – Dec 2020
    </Typography>
  </>
);

// Experience Component
// Lockheed Martin ML App Experience Component
export const LockheedMartinExperience = () => (
  <>
    <Typography variant="h4" gutterBottom>
      Lockheed Martin ML App – X-RAY Weld Flaw Detection App
    </Typography>
    <Typography variant="body1">
      Jan 2024 – May 2024 <br />
      Dev Stack: Keras, Python, Flask, Pyinstaller, React, Electron, Material UI <br />
      Full-stack application for Lockheed Martin to detect microscopic weld flaws in X-ray images...
    </Typography>
  </>
);

// Connect 4 AI Experience Component
export const Connect4AIExperience = () => (
  <>
    <Typography variant="h4" gutterBottom>
      Connect 4 AI
    </Typography>
    <Typography variant="body1">
      Apr 2024 <br />
      Dev Stack: Python, NumPy <br />
      AI agent for playing Connect 4 using bitwise operations for efficiency...
    </Typography>
  </>
);

// iOS Machine Learning App – Dallas Zoo Experience Component
export const DallasZooExperience = () => (
  <>
    <Typography variant="h4" gutterBottom>
      iOS Machine Learning App – Dallas Zoo Animal Identifier
    </Typography>
    <Typography variant="body1">
      Aug 2023 – Dec 2023 <br />
      Dev Stack: Objective-C, Swift, Python, Tornado, PyTorch <br />
      Proof-of-concept iOS app for the Dallas Zoo that captures audio and identifies the animal...
    </Typography>
  </>
);

// 3DVR UI Research Project Experience Component
export const VRUIResearchExperience = () => (
  <>
    <Typography variant="h4" gutterBottom>
      3DVR UI Research Project – Hand Gesture UI Interaction
    </Typography>
    <Typography variant="body1">
      Mar 2023 – May 2023 <br />
      Dev Stack: Unity, C# <br />
      Developed a 3D UI package for VR exploring glassmorphism and intuitive gestural inputs...
    </Typography>
  </>
);

// CS 3330 Full Stack Semester Project Experience Component
export const FarmHandExperience = () => (
  <>
    <Typography variant="h4" gutterBottom>
      CS 3330 Full Stack Semester Project – Farm Hand
    </Typography>
    <Typography variant="body1">
      Jan 2022 – May 2022 <br />
      Dev Stack: MySQL, Express, NodeJS, JavaScript, React, Material UI <br />
      Built an app for managing and trading livestock with a chat feature...
    </Typography>
  </>
);

// Relevant Courses Component
export const CoursesSection = () => (
  <>
    <Typography variant="h4" gutterBottom>
      Relevant Courses
    </Typography>
    <Typography variant="body1">
      Machine Learning, Artificial Intelligence, Digital Computer Design, Software & Project Management, Cloud Computing, 
      Mobile Apps & Sensing, Software Engineering, Operating Systems, Database Concepts, Virtual and Augmented Reality, 
      Fundamentals of Algorithms, Digital Logic Design, Differential Equations, Computer Networks and Systems
    </Typography>
  </>
);

// Organizations Component
export const OrganizationsSection = () => (
  <>
    <Typography variant="h4" gutterBottom>
      Organizations
    </Typography>
    <Typography variant="body1">
      <strong>SMU Esports Club</strong>, Member, Aug 2022 – Present <br />
      <strong>SMU Computer Science Club</strong>, Member, Jan 2022 – Present <br />
      <strong>SMU Cybersecurity Club</strong>, Member, Jan 2022 – Present
    </Typography>
  </>
);

// DownloadResume Component
export const DownloadResumeSection = () => (
  <a rel="noopener noreferrer" href="/docs/Miller_Boyd_Resume.pdf" download>
    <Typography variant="h4" gutterBottom>
      Download Resume
    </Typography>
  </a>
);

// DownloadCoverLetter Component
export const DownloadCoverLetterSection = () => (
  <a rel="noopener noreferrer" href="/docs/Miller_Boyd_Cover_Letter.pdf" download>
    <Typography variant="h4" gutterBottom>
      Download Cover Letter
    </Typography>
    </a>
);
