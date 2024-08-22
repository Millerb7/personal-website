import React, { useState } from 'react';
import { Slider, IconButton, Dialog, DialogContent } from '@mui/material';
import PointerComponent from './Pointer';
import EraserComponent from './Eraser';
import BrushIcon from '@mui/icons-material/Brush';
import CreateIcon from '@mui/icons-material/Create';
import UndoIcon from '@mui/icons-material/Undo';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';

const DrawingBar = ({ selectedTool, setSelectedTool, undoLastStroke, brushSize, setBrushSize, color, setColor }) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const handleColorPickerOpen = () => {
    setIsColorPickerOpen(true);
  };

  const handleColorPickerClose = () => {
    setIsColorPickerOpen(false);
  };

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
      <IconButton 
        color="default"
        onClick={undoLastStroke}  // Trigger undo when clicked
        title="Undo"
      >
        <UndoIcon />
      </IconButton>
      <IconButton
        color="default"
        onClick={handleColorPickerOpen}
      >
        <ColorLensIcon />
      </IconButton>
      <Slider
        value={brushSize}
        onChange={(event, newValue) => setBrushSize(newValue)}
        aria-labelledby="brush-size-slider"
        min={1}
        max={50} // Maximum brush size
      />

      <Dialog open={isColorPickerOpen} onClose={handleColorPickerClose}>
        <DialogContent>
          <SketchPicker
            color={color}
            onChangeComplete={(newColor) => setColor(newColor.hex)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

DrawingBar.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  setSelectedTool: PropTypes.func.isRequired,
  undoLastStroke: PropTypes.func.isRequired,
  brushSize: PropTypes.number.isRequired,
  setBrushSize: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  setColor: PropTypes.func.isRequired,
};

export default DrawingBar;
