import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

const ComponentRemover = ({ setSelectedTool, selectedTool, removeComponent }) => {
  return (
    <IconButton 
      color={selectedTool === 'componentRemover' ? 'primary' : 'default'}
      onClick={() => setSelectedTool('componentRemover')}
      title="Remove Component"
    >
      <DeleteIcon />
    </IconButton>
  );
};

ComponentRemover.propTypes = {
  setSelectedTool: PropTypes.func.isRequired,
  selectedTool: PropTypes.string.isRequired,
  removeComponent: PropTypes.func.isRequired,
};

export default ComponentRemover;
