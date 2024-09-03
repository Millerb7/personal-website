import React, { useState } from "react";
import { Slider, IconButton, Dialog, DialogContent } from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import CreateIcon from "@mui/icons-material/Create";
import UndoIcon from "@mui/icons-material/Undo";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import EraserComponent from "../Eraser";
import { SketchPicker } from "react-color";
import BaseDrawingBar from "./BasicDrawingBar";

const HomeDrawingBar = ({
  setSelectedTool,
  selectedTool,
  brushSize,
  setBrushSize,
  color,
  setColor,
  undoLastStroke,
}) => {

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const handleColorPickerOpen = () => {
    setIsColorPickerOpen(true);
  };

  const handleColorPickerClose = () => {
    setIsColorPickerOpen(false);
  };

  return (
    <BaseDrawingBar
      setSelectedTool={setSelectedTool}
      selectedTool={selectedTool}
    >
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
        <Dialog open={isColorPickerOpen} onClose={handleColorPickerClose}>
        <DialogContent>
          <SketchPicker
            color={color}
            onChangeComplete={(newColor) => setColor(newColor.hex)}
          />
        </DialogContent>
      </Dialog>
    </BaseDrawingBar>
  );
};

export default HomeDrawingBar;
