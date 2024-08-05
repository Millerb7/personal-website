import React from 'react';
import { Slider, IconButton } from '@mui/material';
import PointerComponent from './Pointer';
import EraserComponent from './Eraser';
import BrushIcon from '@mui/icons-material/Brush';
import CreateIcon from '@mui/icons-material/Create';
import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';

const DrawingBar = ({ selectedTool, setSelectedTool, brushSize, setBrushSize, color, setColor }) => {
  return (
    <div>
      <PointerComponent setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
      <IconButton
        color={selectedTool === 'brush' ? 'primary' : 'default'}
        onClick={() => setSelectedTool('brush')}
      >
        <BrushIcon />
      </IconButton>
      <IconButton
        color={selectedTool === 'pen' ? 'primary' : 'default'}
        onClick={() => setSelectedTool('pen')}
      >
        <CreateIcon />
      </IconButton>
      <EraserComponent setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
      <Slider
        value={brushSize}
        onChange={(event, newValue) => setBrushSize(newValue)}
        aria-labelledby="brush-size-slider"
        min={1}
        max={50} // Maximum brush size
      />
      <SketchPicker
        color={color}
        onChangeComplete={(newColor) => setColor(newColor.hex)}
      />
    </div>
  );
};

DrawingBar.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  setSelectedTool: PropTypes.func.isRequired,
  brushSize: PropTypes.number.isRequired,
  setBrushSize: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  setColor: PropTypes.func.isRequired,
};

export default DrawingBar;
