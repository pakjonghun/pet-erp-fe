import { useState } from 'react';
import Box from '@mui/material/Box';
import { Resizable } from 're-resizable';

interface ResizableContainerProps {
  children: React.ReactNode;
  initialWidth?: string | number;
  initialHeight?: string | number;
}

const ResizableContainer: React.FC<ResizableContainerProps> = ({
  children,
  initialWidth = '100%',
  initialHeight = '70vh',
}) => {
  return (
    <Resizable
      defaultSize={{
        width: initialWidth,
        height: initialHeight,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxSizing: 'border-box',
          overflow: 'hidden',
          borderRadius: '4px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #d3d3d3',
        }}
      >
        {children}
      </Box>
    </Resizable>
  );
};

export default ResizableContainer;
