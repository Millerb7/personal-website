import React, { useState } from "react";
import { Slider, IconButton, Dialog, DialogContent } from "@mui/material";
import PointerComponent from "./Pointer";
import EraserComponent from "./Eraser";
import ComponentRemover from "./ComponentRemover"; // Component to remove other elements
import BrushIcon from "@mui/icons-material/Brush";
import CreateIcon from "@mui/icons-material/Create";
import UndoIcon from "@mui/icons-material/Undo";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { SketchPicker } from "react-color";
import PropTypes from "prop-types";

const DrawingBar = ({
  selectedTool,
  setSelectedTool,
  brushSize,
  setBrushSize,
  color,
  setColor,
  undoLastStroke,
  page, 
  addElementToPage, 
  removeComponent, 
}) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const handleColorPickerOpen = () => {
    setIsColorPickerOpen(true);
  };

  const handleColorPickerClose = () => {
    setIsColorPickerOpen(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <PointerComponent
        setSelectedTool={setSelectedTool}
        selectedTool={selectedTool}
      />

      {page === "resume" || page === "work" ? (
        <>
          {/* Buttons to add elements specific to resume/work pages */}
          <IconButton
            color="default"
            onClick={() => addElementToPage("resume")}
          >
            <DescriptionIcon />
          </IconButton>
          <IconButton
            color="default"
            onClick={() => addElementToPage("coverLetter")}
          >
            <PictureAsPdfIcon />
          </IconButton>

          {/* ComponentRemover to delete added components */}
          <ComponentRemover
            setSelectedTool={setSelectedTool}
            selectedTool={selectedTool}
            removeComponent={removeComponent}
          />
        </>
      ) : (
        <>
          {/* Drawing tools for non-resume/work pages */}
          <IconButton
            color={selectedTool === "brush" ? "primary" : "default"}
            onClick={() => setSelectedTool("brush")}
          >
            <BrushIcon />
          </IconButton>
          <IconButton
            color={selectedTool === "pen" ? "primary" : "default"}
            onClick={() => setSelectedTool("pen")}
          >
            <CreateIcon />
          </IconButton>

          <EraserComponent
            setSelectedTool={setSelectedTool}
            selectedTool={selectedTool}
          />

          <IconButton color="default" onClick={undoLastStroke}>
            <UndoIcon />
          </IconButton>

          <IconButton color="default" onClick={handleColorPickerOpen}>
            <ColorLensIcon />
          </IconButton>

          <Slider
            value={brushSize}
            onChange={(event, newValue) => setBrushSize(newValue)}
            aria-labelledby="brush-size-slider"
            min={1}
            max={50}
            style={{ width: "100px", marginLeft: "16px" }}
          />
        </>
      )}

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
  brushSize: PropTypes.number.isRequired,
  setBrushSize: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  setColor: PropTypes.func.isRequired,
  undoLastStroke: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  addElementToPage: PropTypes.func.isRequired,
  removeComponent: PropTypes.func.isRequired,
};

export default DrawingBar;
