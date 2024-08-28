import React from 'react';
import { css } from 'emotion';
import { useDrag } from 'react-dnd';
import { Service } from '../types';

interface Props {
  service: Service;
}

const ServiceItem: React.FC<Props> = ({ service }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'SERVICE',
    item: service,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} className="service-item">
      <div
        className={css`
          opacity: ${opacity};
          margin-right: 10px;
          padding: 5px 10px;
          color: white;
          font-size: 16px;
          background-color: ${service.color};
          border: 1px solid #ddd;
          cursor: move;
        `}
      >
        {service.name}
      </div>
    </div>
  );
};

export default ServiceItem;
