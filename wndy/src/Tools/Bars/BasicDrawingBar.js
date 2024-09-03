import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { IconButton, Box } from '@mui/material';
import PointerComponent from '../Pointer';

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

const BaseDrawingBar = ({ setSelectedTool, selectedTool, children }) => {
  return (
    <BottomBar>
      <PointerComponent setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
      {children} {/* Render additional buttons passed from derived components */}
    </BottomBar>
  );
};

BaseDrawingBar.propTypes = {
  setSelectedTool: PropTypes.func.isRequired,
  selectedTool: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default BaseDrawingBar;
