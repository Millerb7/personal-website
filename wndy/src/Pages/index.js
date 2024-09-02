import React, { createContext, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';
import DrawingBar from '../Tools/DrawingApp';
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
}));

// Bottom Bar for drawing tools
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
  zIndex: 11, // Ensure it's on top and clickable
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
    <Box>
      <NavigationContainer>
        <StickyNote component={RouterLink} to="/">Home</StickyNote>
        <StickyNote component={RouterLink} to="/resume">Resume</StickyNote>
        <StickyNote component={RouterLink} to="/work">Works</StickyNote>
      </NavigationContainer>

      <ContentArea>
        <Outlet context={{ selectedTool, setSelectedTool, addElementToPage }} />
      </ContentArea>

      <BottomBar>
        <DrawingBar
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          color={color}
          setColor={setColor}
          page={location.pathname.replace('/', '') || 'home'} // Pass the current page identifier
          addElementToPage={addElementToPage} // Pass the function to add elements to the page
        />
      </BottomBar>
    </Box>
  );
}
