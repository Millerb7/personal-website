import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  HeaderSection,
  LanguagesToolsSection,
  EducationSection,
  CoursesSection,
  OrganizationsSection,
  LockheedMartinExperience, // Import new components
  Connect4AIExperience,
  DallasZooExperience,
  VRUIResearchExperience,
  FarmHandExperience,
  DownloadResumeSection,
  DownloadCoverLetterSection,
} from "../Layouts/ResumeSections";
import { useOutletContext } from "react-router-dom";
import './page.css';

const componentMap = {
  header: HeaderSection,
  downloadResume: DownloadResumeSection,
  downloadCoverLetter: DownloadCoverLetterSection,
  languagesTools: LanguagesToolsSection,
  education: EducationSection,
  courses: CoursesSection,
  organizations: OrganizationsSection,
  lockheedMartin: LockheedMartinExperience,
  connect4AI: Connect4AIExperience,
  dallasZoo: DallasZooExperience,
  vrUIResearch: VRUIResearchExperience,
  farmHand: FarmHandExperience,
};

export const Resume = () => {
  const { selectedTool } = useOutletContext(); 
  const [components, setComponents] = useState([
    { id: 1, component: <HeaderSection key={1} /> },
    { id: 2, component: <DownloadResumeSection key={2} /> }, 
    { id: 3, component: <DownloadCoverLetterSection key={3} /> },
    { id: 4, component: <LanguagesToolsSection key={4} /> },
    { id: 5, component: <EducationSection key={5} /> },
    { id: 6, component: <LockheedMartinExperience key={6} /> },
    { id: 7, component: <Connect4AIExperience key={7} /> },
    { id: 8, component: <DallasZooExperience key={8} /> },
    { id: 9, component: <VRUIResearchExperience key={9} /> },
    { id: 10, component: <FarmHandExperience key={10} /> },
    { id: 11, component: <CoursesSection key={11} /> },
    { id: 12, component: <OrganizationsSection key={12} /> },

  ]);

  const addElementToPage = (componentKey) => {
    const ComponentToAdd = componentMap[componentKey];
    if (ComponentToAdd) {
      setComponents((prev) => [
        ...prev,
        { id: prev.length + 1, component: <ComponentToAdd key={prev.length + 1} /> },
      ]);
    }
  };

  const handleRemoveComponent = (id) => {
    if(selectedTool === 'componentRemover')
        setComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {components.map((comp) => (
          <Box 
          key={comp.id} 
          onClick={() => handleRemoveComponent(comp.id)}
          className="cabin-sketch-regular permanent-marker-regular">
            {comp.component}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
