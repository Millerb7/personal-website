import React, { createContext, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';
import { StickyNote } from '../Layouts/StickyNote';

export const UserContext = createContext(null);

// Navigation Container styled to be interactable
const NavigationContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '0',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  zIndex: 20,
  padding: theme.spacing(1),
  width: '100%',
  pointerEvents: 'none',  // Disable pointer events so the canvas can be interacted with
}));

// Main content area for pages
const ContentArea = styled(Box)(({ theme }) => ({
  paddingTop: '120px', // Adjust paddingTop to account for the nav height
  paddingBottom: '20px', // Add padding at the bottom to prevent overlap with drawing bar
}));

export default function DashboardLayout() {
  const [user, setUser] = useState(undefined);
  const [selectedTool, setSelectedTool] = useState('pointer');
  const [brushSize, setBrushSize] = useState(5);
  const [color, setColor] = useState('#000000');
  const location = useLocation();

  const addElementToPage = (elementType) => {
    // Logic to add elements to the page
  };

  return (
    <Box style={{ backgroundImage: `url('/images/brown-paper.png')`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <NavigationContainer>
        <StickyNote component={RouterLink} to="/">Home</StickyNote>
        <StickyNote component={RouterLink} to="/resume">Resume</StickyNote>
        <StickyNote component={RouterLink} to="/work">Works</StickyNote>
      </NavigationContainer>

      <ContentArea>
        <Outlet context={{ selectedTool, setSelectedTool, brushSize, setBrushSize, color, setColor, addElementToPage }} />
      </ContentArea>
    </Box>
  );
}
