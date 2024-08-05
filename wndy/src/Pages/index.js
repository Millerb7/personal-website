import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import CanvasComponent from '../Layouts/Canvas';
import DrawingBar from '../Tools/DrawingApp';

export const UserContext = createContext(null);

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
