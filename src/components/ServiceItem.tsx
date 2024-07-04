import React from 'react';
import { css } from 'emotion';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Service } from '../types';

interface ServiceItemProps{
    service: Service;
}

const ServiceItem: React.FC<ServiceItemProps> = ({service}) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'SERVICE',
      item: service,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const opacity = isDragging ? 0.4 : 1;
  
    return (
      <div ref={drag} className="service-item">
        <div className={css`
            opacity: ${opacity};
            margin-right: 10px;
            padding: 5px 10px;
            background-color: ${service.color};
            border: 1px solid #ddd;
            cursor: move;
        `}>
            {service.name}
        </div>
      </div>
    );
  };

export default ServiceItem;
