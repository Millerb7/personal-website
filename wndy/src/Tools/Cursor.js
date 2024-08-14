import React, { useState, useEffect, useRef } from 'react';

const Whiteboard = () => {
    const [brushColor, setBrushColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(10);
    const canvasRef = useRef(null);

    useEffect(() => {
        updateCursor();
    }, [brushColor, brushSize]);

    const updateCursor = () => {
        const cursorCanvas = document.createElement('canvas');
        const ctx = cursorCanvas.getContext('2d');
        const size = brushSize * 2;

        cursorCanvas.width = size;
        cursorCanvas.height = size;

        ctx.beginPath();
        ctx.arc(size / 2, size / 2, brushSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = brushColor;
        ctx.fill();

        const dataURL = cursorCanvas.toDataURL();
        canvasRef.current.style.cursor = `url(${dataURL}) ${brushSize / 2} ${brushSize / 2}, auto`;
    };

    return (
        <div>
            <canvas ref={canvasRef} width={800} height={600} />
            {/* UI for changing brush color and size */}
            <input 
                type="color" 
                value={brushColor} 
                onChange={(e) => setBrushColor(e.target.value)} 
            />
            <input 
                type="range" 
                min="1" 
                max="50" 
                value={brushSize} 
                onChange={(e) => setBrushSize(e.target.value)} 
            />
        </div>
    );
};

export default Whiteboard;



