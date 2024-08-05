import React from 'react';
import { IconButton } from '@mui/material';
import PanToolIcon from '@mui/icons-material/PanTool'; // Icon representing a pointer hand
import PropTypes from 'prop-types';

const PointerComponent = ({ setSelectedTool, selectedTool }) => {
  return (
    <IconButton
      color={selectedTool === 'pointer' ? 'primary' : 'default'}
      onClick={() => setSelectedTool('pointer')}
      title="Pointer"
    >
      <PanToolIcon />
    </IconButton>
  );
};

PointerComponent.propTypes = {
  setSelectedTool: PropTypes.func.isRequired,
  selectedTool: PropTypes.string.isRequired,
};

export default PointerComponent;
