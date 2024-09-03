import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  HeaderSection,
  LanguagesToolsSection,
  EducationSection,
  CoursesSection,
  OrganizationsSection,
  LockheedMartinExperience,
  Connect4AIExperience,
  DallasZooExperience,
  VRUIResearchExperience,
  FarmHandExperience,
  DownloadResumeSection,
  DownloadCoverLetterSection,
} from "../Layouts/ResumeSections";
import { useOutletContext } from "react-router-dom";
import "./page.css";
import { RandomizedSectionBox } from "../Layouts/SectionBox";
import ResumeDrawingBar from "../Tools/Bars/ResumeBar";

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
  const {
    selectedTool,
    setSelectedTool,
    brushSize,
    setBrushSize,
    color,
    setColor,
  } = useOutletContext();
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
        {
          id: prev.length + 1,
          component: <ComponentToAdd key={prev.length + 1} />,
        },
      ]);
    }
  };

  const handleRemoveComponent = (id) => {
    if (selectedTool === "componentRemover")
      setComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap", // Allows items to wrap to the next line if they don't fit
        justifyContent: "center", // Distribute items with equal space around them
        margin: "0 auto", // Center the flex container in its parent
        marginBottom: "5%",
      }}
    >
      {components.map((comp) => (
        <RandomizedSectionBox
          key={comp.id}
          onClick={() => handleRemoveComponent(comp.id)}
          className="cabin-sketch-regular permanent-marker-regular"
          sx={{
            flex: "1 1 calc(50% - 40px)", // Flex-grow, flex-shrink, and basis; adjust as needed
            maxWidth: {
              xs: "100%", // 1 item per row on extra-small screens
              sm: "calc(45% - 20px)", // 2 items per row on small screens
              md: "calc(45% - 40px)", // 3 items per row on medium screens
              lg: "calc(30% - 40px)", // 4 items per row on large screens
            },
            gap: "2%", // Reducing the gap to give more room for the columns
            padding: "2%", // Adding padding to ensure there's space around the grid
            boxSizing: "border-box", // Include padding and border in element's width
          }}
        >
          {comp.component}
          <ResumeDrawingBar
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
            brushSize={brushSize}
            setBrushSize={setBrushSize}
            color={color}
            setColor={setColor}
          ></ResumeDrawingBar>
        </RandomizedSectionBox>
      ))}
    </Box>
  );
};
