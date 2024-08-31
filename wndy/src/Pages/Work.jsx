import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  LockheedMartinDetail,
  // Import more detailed components as needed
} from "../Layouts/WorkSections";
import { useOutletContext } from "react-router-dom";
import './page.css';

const componentMap = {
  lockheedMartin: LockheedMartinDetail,
  // Add more mappings as needed
};

export const Work = () => {
  const { selectedTool } = useOutletContext(); 
  const [components, setComponents] = useState([
    { id: 1, component: <LockheedMartinDetail key={1} /> },
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
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
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
