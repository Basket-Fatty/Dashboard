import { css } from 'emotion';
import React, { useState } from 'react';
import ServiceItem from './ServiceItem';
import { Service } from '../types';

//service lists
const sampleServices: Service[] = [
  { id: 1, name: 'Forwarding', color: '#F40202'},
  { id: 2, name: 'Mirroring', color: '#491AD4'},
  { id: 3, name: 'ACL', color: '#DAC538'},
  { id: 4, name: 'Asset Discovery', color: '#43D44D'}
];

const ServiceBar = () => {
  const [services] = useState(sampleServices);

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
    `}>
      {services.map((service, index) => (
        <ServiceItem key={index} service={service} />
      ))}
    </div>
  );
};

export default ServiceBar;
