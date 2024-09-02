import React, { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const noteImages = [
    '/images/notes/cyan_note.png',
    '/images/notes/green_note.png',
    '/images/notes/lavender_note.png',
    '/images/notes/orange_note.png',
    '/images/notes/yellow_note.png',
]; 

export const SectionBox = styled(Box)(({ theme, image }) => ({
  padding: theme.spacing(2),  // Use theme-based spacing
  margin: theme.spacing(2),   // Use theme-based spacing
  backgroundImage: `url('${image}')`,
  backgroundSize: 'cover',
  width: '100%',
  transition: 'box-shadow 0.3s ease-in-out',

  // Responsive margins and padding
  [theme.breakpoints.up('xs')]: {
    margin: theme.spacing(1),
  },
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(1.5),
  },
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(2),
  },
  [theme.breakpoints.up('lg')]: {
    margin: theme.spacing(2.5),
  },
  [theme.breakpoints.up('xl')]: {
    margin: theme.spacing(3),
  },
  
  overflow: 'hidden',

}));

export const RandomizedSectionBox = ({ children, ...props }) => {
  const randomImage = useMemo(() => {
    return noteImages[Math.floor(Math.random() * noteImages.length)];
  }, []);

  return (
    <SectionBox image={randomImage} {...props}>
      {children}
    </SectionBox>
  );
};
