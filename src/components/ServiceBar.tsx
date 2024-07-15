import { css } from 'emotion';
import React, { useState } from 'react';
import ServiceItem from './ServiceItem';
import { Service, Weathermap } from '../types';

//sample service lists
const sampleServices: Service[] = [
  { id: 1, name: 'Forwarding', color: '#F40202'},
  { id: 2, name: 'Mirroring', color: '#491AD4'},
  { id: 3, name: 'ACL', color: '#DAC538'},
  { id: 4, name: 'Asset Discovery', color: '#43D44D'}
];

interface Props{
  wm: Weathermap;
}

const ServiceBar: React.FC<Props> = ({wm}) => {
  const [services] = useState(sampleServices);

  //receive and sync the topology information from back end
  const sync = async () => {
    console.log(wm.nodes);
    // try {
    //   const response = await fetch('/api/topology'); // 假设 API 路径为 /api/topology
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   const data: Topology = await response.json();
    //   setTopology(data);
    // } catch (error) {
    //   console.error('Failed to fetch topology:', error);
    // }
  };

  //send the topology information to back end
  const send = async () => {
    console.log(wm.links);
    // try {
    //   const response = await fetch('/api/send', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       topology: wm, // 发送当前的拓扑数据
    //       services: services, // 如果需要发送服务数据
    //     }),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }

    //   const data = await response.json();
    //   console.log('Sent data:', data);
    //   // 根据需要处理返回的数据

    // } catch (error) {
    //   console.error('Failed to send data:', error);
    //   // 根据需要处理错误
    // }
  };

  return (
    <div className={css`
      position: fixed;
      top: 0;
      width: 100%;
      color: white;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
      z-index: 1000;
      display: flex;
      padding: 10px;
      border: 1px solid #ccc;
    `}>
      <div className={css`
        display: flex;
      `}>
        {services.map((service, index) => (
          <ServiceItem key={index} service={service} />
        ))}
      </div>
      <div className={css`
        margin-left: auto;
        display: flex;
      `}>
        <button onClick={sync} className={css`
          margin-right: 10px;
          padding: 5px 10px;
          border: none;
          background-color: #007bff;
          color: white;
          cursor: pointer;
        `}>
          Sync
        </button>
        <button onClick={send} className={css`
          padding: 5px 10px;
          border: none;
          background-color: #28a745;
          color: white;
          cursor: pointer;
        `}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ServiceBar;
