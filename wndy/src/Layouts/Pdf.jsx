import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CollapsiblePDFViewer = ({ pdfUrl, title }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={toggleCollapse}>
        {collapsed ? `Show ${title}` : `Hide ${title}`}
      </Button>
      {!collapsed && (
        <Box sx={{ marginTop: 2 }}>
          <Document file={pdfUrl}>
            <Page pageNumber={1} />
          </Document>
        </Box>
      )}
    </Box>
  );
};

export default CollapsiblePDFViewer;
