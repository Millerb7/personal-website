

export const undoLastStroke = (localStack, setLocalStack, globalStack, setGlobalStack, redrawCanvas, socket) => {
    if (localStack.length > 0) {
      const lastStroke = localStack.pop();
      setGlobalStack(globalStack.filter((stroke) => stroke !== lastStroke));
      redrawCanvas(globalStack);
  
      if (socket) {
        socket.emit('undo'); // Notify other clients to undo the last stroke
      }
    }
  };
  