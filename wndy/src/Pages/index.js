import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import CanvasComponent from '../Layouts/Canvas';
import { Box, Button } from "@mui/material";
import DrawingBar from '../Tools/DrawingApp';

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

const NavigationContainer = styled(Box)({
  position: "absolute",
  top: "10px",
  left: "50%",
  transform: "translateX(-50%)", // Center the navigation
  display: "flex",
  flexDirection: "row", // Align items in a row
  zIndex: 5, // Ensure it's above the canvas
});

const BottomBar = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(145deg, #e1e1e1, #f0f0f0)',
  borderTop: `1px solid #bfbfbf`,
  boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1),
  zIndex: 3,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(to right, #fff, #ccc, #fff)',
    borderRadius: '2px',
  },
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
      <CanvasComponent selectedTool={selectedTool} brushSize={brushSize} color={color} />      
      <Box component="main" sx={{ zIndex: 1, position: 'relative' }}>
        <Outlet context={{ user }} />
      </Box>
      <BottomBar>
        <DrawingBar
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          color={color}
          setColor={setColor}
        />
      </BottomBar>
    </UserContext.Provider>
  );
}
