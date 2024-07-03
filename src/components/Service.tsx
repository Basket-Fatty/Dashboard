import React, { useState } from 'react';
import { css } from 'emotion';
import { useDrag, useDrop } from 'react-dnd';
import { Service } from '../types'


//service lists
const fixedServices = [
  { name: 'Forwarding', color: '#F40202'},
  { name: 'Mirroring', color: '#491AD4'},
  { name: 'ACL', color: '#DAC538'},
  { name: 'Asset Discovery', color: '#43D44D'}
];

const ServiceItem = ({ service }) => {
    // const [, ref] = useDrag({
    //   type: 'SERVICE',
    //   item: { service },
    // });
  
    return (
    //   <div ref={ref} className="service-item">
    <div className={css`
        margin-right: 10px;
        padding: 5px 10px;
        background-color: ${service.color};
        border: 1px solid #ddd;
        cursor: move;
    `}>
        {service.name}
    </div>
    );
  };

const ServiceBar = ( ) => {
  const [services] = useState(fixedServices);

  return (
      <div className={css`
        position: fixed;
        top: 0;
        width: 100%;
        background-color: #f5f5f5;
        border-bottom: 1px solid #ddd;
        z-index: 1000;
        display: flex;
        padding: 10px;
        border: 1px solid #ccc;
        margin-down: 60px;
      `}>
        {services.map((service, index) => (
          <ServiceItem service={service} />
        ))}
      </div>
  );
};

export default ServiceBar;
