import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  LockheedMartinDetail,
  DallasZooDetail,
  // Import more detailed components as needed
} from "../Layouts/WorkSections";
import { useOutletContext } from "react-router-dom";
import './page.css';
import { RandomizedSectionBox } from "../Layouts/SectionBox";

const componentMap = {
  lockheedMartin: LockheedMartinDetail,
  dallasZoo: DallasZooDetail,
  // Add more mappings as needed
};

export const Work = () => {
  const { selectedTool } = useOutletContext(); 
  const [components, setComponents] = useState([
    { id: 1, component: <LockheedMartinDetail key={1} /> },
    { id: 2, component: <DallasZooDetail key={2} /> },
    // Initialize with more detailed components if needed
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
    if (selectedTool === "componentRemover")
      setComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Allows items to wrap to the next line if they don't fit
          justifyContent: "space-around", // Distribute items with equal space around them
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
                sm: "calc(100% - 20px)", // 2 items per row on small screens
                md: "calc(45% - 40px)", // 3 items per row on medium screens
                lg: "calc(45% - 40px)", // 4 items per row on large screens
              },
              boxSizing: "border-box", // Include padding and border in element's width
              marginBottom: "10%",
            }}
          >
            {comp.component}
          </RandomizedSectionBox>
        ))}
      </Box>
  );
  
  
};
