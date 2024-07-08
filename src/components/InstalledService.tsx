import React from 'react';
import { css } from 'emotion';
import { useDrag } from 'react-dnd';
import { Service } from '../types';

interface Props{
  index: number;
  rectX: number;
  rectY: number;
  rectHeight: number;
  smallSquareSize: number;
  services: Service[];
}

const InstalledService: React.FC<Props> = (props) => {
  //Drag to uninstall service
  const [{ isDragging }, drag] = useDrag({
    type: 'INSTALLEDSERVICE',
    item: props.services[props.index],
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return(
    <rect
        ref={drag}
        opacity={opacity}

        key={props.index}
        x={props.rectX + props.index * props.smallSquareSize}
        y={props.rectY + props.rectHeight}
        width={props.smallSquareSize}
        height={props.smallSquareSize}
        // fill the small square with service's color
        fill={props.services[props.index] ? props.services[props.index].color : 'none'}
        stroke="black"
        strokeWidth={1}
    />
  );
};

export default InstalledService;
