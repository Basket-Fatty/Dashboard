import { css } from 'emotion';
import React, { useState } from 'react';
import ServiceItem from './ServiceItem';
import { Service, Weathermap, Node, Link } from '../types';

//sample service lists
const sampleServices: Service[] = [
  { id: 1, name: 'Forwarding', color: '#F40202', abbreviation: 'FW'},
  { id: 2, name: 'Mirroring', color: '#491AD4', abbreviation: 'MR'},
  { id: 3, name: 'ACL', color: '#DAC538', abbreviation: 'AC'},
  { id: 4, name: 'Asset Discovery', color: '#43D44D', abbreviation: 'AD'}
];

interface Props{
  wm: Weathermap;
  updateTopology: (nodes: Node[], links: Link[]) => void;
}

const ServiceBar: React.FC<Props> = (props) => {
  const { wm, updateTopology } = props;
  const [services] = useState(sampleServices);

  //receive and sync the topology information from back end
  const sync = async () => {
    console.log(wm.nodes);
    // try {
    //   const response = await fetch('/api/topology');
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   const topology = await response.json();
    //   updateTopology(topology.nodes, topology.links);
    // } catch (error) {
    //   console.error('Failed to fetch topology:', error);
    // }
  };

  //send the topology information to back end
  const install = async () => {
    console.log(wm.links);
    // try {
    //   const response = await fetch('/api/send', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       nodes: wm.nodes,
    //       links: wm.links
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
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
    `}>
      <div className={css`
        display: flex;
        flex-wrap: nowrap;
      `}>
        {services.map((service, index) => (
          <ServiceItem key={index} service={service} />
        ))}
      </div>
      <div className={css`
        margin-left: auto;
        display: flex;
        flex-wrap: nowrap;
      `}>
        <button onClick={sync} className={css`
          margin-right: 10px;
          padding: 5px 10px;
          border: none;
          background-color: #007bff;
          color: white;
          font-size: 16px;
          cursor: pointer;
          box-sizing: border-box;
        `}>
          Sync
        </button>
        <button onClick={install} className={css`
          padding: 5px 10px;
          border: none;
          background-color: #28a745;
          color: white;
          font-size: 16px;
          cursor: pointer;
          box-sizing: border-box;
        `}>
          Install
        </button>
      </div>
    </div>
  );
};

export default ServiceBar;
