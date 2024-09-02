import React, { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledStickyNote = styled(Button)(({ theme, backgroundImage }) => ({
  backgroundImage: `url('${backgroundImage}')`,
  backgroundSize: 'cover',
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  textTransform: 'none',
  fontWeight: 'bold',
  color: '#4a4a4a',
  width: '100px',
  height: '100px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StickyNote = ({ children, ...props }) => {
  const noteImages = [
    '/images/notes/cyan_note.png',
    '/images/notes/green_note.png',
    '/images/notes/lavender_note.png',
    '/images/notes/orange_note.png',
    '/images/notes/yellow_note.png',
  ]; 

  const randomImage = useMemo(() => {
    return noteImages[Math.floor(Math.random() * noteImages.length)];
  }, []); 

  return (
    <StyledStickyNote backgroundImage={randomImage} {...props}>
      {children}
    </StyledStickyNote>
  );
};
