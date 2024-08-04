import React from 'react';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';

const EraserComponent = ({ setSelectedTool, selectedTool }) => {
  return (
    <IconButton 
      color={selectedTool === 'eraser' ? 'primary' : 'default'}
      onClick={() => setSelectedTool('eraser')}
      title="Eraser"
    >
      <ClearIcon />
    </IconButton>
  );
};

EraserComponent.propTypes = {
  setSelectedTool: PropTypes.func.isRequired,
  selectedTool: PropTypes.string.isRequired,
};

export default EraserComponent;
