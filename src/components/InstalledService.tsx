import React, { useState } from 'react';
import { Service } from '../types';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { Weathermap } from '../types';

interface Props{
  wm: Weathermap;
  aspectMultiplier: number,
  updateNode: () => void;
  index: number;
  rectX: number;
  rectY: number;
  rectHeight: number;
  smallSquareSize: number;
  services: Service[];
}

const InstalledService: React.FC<Props> = (props) => {
  const { wm, aspectMultiplier, updateNode, index, rectX, rectY, rectHeight, smallSquareSize, services } = props;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [inDropZone, setInDropZone] = useState(false);

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setDragging(true);

    //synchronize the movement distance with the scale of the panel
    const zoomAmt = Math.pow(1.2, wm.settings.panel.zoomScale);
    setPosition((prev) => {
      return {
        x: prev.x + data.deltaX * zoomAmt * aspectMultiplier,
        y: prev.y + data.deltaY * zoomAmt * aspectMultiplier,
      };
    });
    
    //over this distance to uninstall service
    const threshold = 25;
    if (Math.abs(data.x)>threshold || Math.abs(data.y)>threshold) {
      setInDropZone(true);
    } else {
      setInDropZone(false);
    }
  };

  const handleStop = () => {
    setDragging(false);
    if (inDropZone) {
      //delete current service
      services.splice(index, 1);
      updateNode();
    }
    //put the rect back to original position
    setPosition({ x: 0, y: 0 });
  };

  //if there is no service installed, the rect is not draggable
  const bounds = services[index]
  ? { left: -Infinity, top: -Infinity, right: Infinity, bottom: Infinity }
  : { left: position.x, top: position.y, right: position.x, bottom: position.y };

  return(
    <Draggable
        position={position}
        bounds={bounds}
        onDrag={handleDrag}
        onStop={handleStop}
      >
      <rect
          key={index}
          x={rectX + index * smallSquareSize}
          y={rectY + rectHeight}
          width={smallSquareSize}
          height={smallSquareSize}
          // fill the small square with service's color
          fill={services[index] ? services[index].color : 'none'}
          stroke="black"
          strokeWidth={1}
          style={{
            opacity: dragging ? 0.5 : 1,
            cursor: 'move',
          }}
      />
    </Draggable>
  );
};

export default InstalledService;
