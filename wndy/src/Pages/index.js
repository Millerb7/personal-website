import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import CanvasComponent from '../Layouts/Canvas';
import { Box, Button } from "@mui/material";

export const UserContext = createContext(null);

// Styled component for sticky note buttons
const StickyNote = styled(Button)(({ theme }) => ({
  background: "linear-gradient(145deg, #f7e7a5, #f5d689)",
  borderRadius: "5px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  textTransform: "none",
  fontWeight: "bold",
  color: "#4a4a4a",
  "&:hover": {
    background: "linear-gradient(145deg, #f5d689, #f7e7a5)",
    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    width: "5px",
    height: "5px",
    background: "#c9a742",
    borderRadius: "50%",
    top: "5px",
    right: "5px",
  },
}));

// Navigation Container styled to be interactable
const NavigationContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "0",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "row",
  zIndex: 20, // Ensure the navbar is above everything else
  background: "white",
  padding: theme.spacing(1),
  width: "100%",
}));

// Main content area that will be in the background
const ContentArea = styled(Box)(({ theme }) => ({
  paddingTop: '60px', // Adjust paddingTop to account for the nav height
  pointerEvents: 'none', // Disable pointer events so the canvas can capture all interactions
}));

export default function DashboardLayout() {
  const [user, setUser] = useState(undefined);
  const [selectedTool, setSelectedTool] = useState('brush');
  const [brushSize, setBrushSize] = useState(5); // Default brush size
  const [color, setColor] = useState('#000000'); // Default color

  useEffect(() => {
    // Fetch user details or other initial data if needed
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <StickyNote component={RouterLink} to="/">Home</StickyNote>
        <StickyNote component={RouterLink} to="/blog">Blog</StickyNote>
        <StickyNote component={RouterLink} to="/profile">Profile</StickyNote>
        <StickyNote component={RouterLink} to="/resume">Resume</StickyNote>
        <StickyNote component={RouterLink} to="/work">Work</StickyNote>
      </NavigationContainer>
      
      <ContentArea>
        <Outlet context={{ user }} />
      </ContentArea>
      
      {/* Pass down the props needed for the DrawingBar inside the Canvas */}
      <CanvasComponent 
        selectedTool={selectedTool} 
        setSelectedTool={setSelectedTool}
        brushSize={brushSize} 
        setBrushSize={setBrushSize}
        color={color} 
        setColor={setColor}
      />
    </UserContext.Provider>
  );
}
