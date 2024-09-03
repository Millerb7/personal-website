import React from 'react';
import { IconButton } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import BaseDrawingBar from './BasicDrawingBar';

const ResumeDrawingBar = ({ setSelectedTool, selectedTool, addElementToPage }) => {
  return (
    <BaseDrawingBar setSelectedTool={setSelectedTool} selectedTool={selectedTool}>
      <IconButton color="default" onClick={() => addElementToPage('resume')}>
        <DescriptionIcon />
      </IconButton>
      <IconButton color="default" onClick={() => addElementToPage('coverLetter')}>
        <PictureAsPdfIcon />
      </IconButton>
    </BaseDrawingBar>
  );
};

export default ResumeDrawingBar;
