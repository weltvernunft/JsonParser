import React from 'react';
import './Button.css';

const IconCircle = ({ onClick, icon }) => {
  return (
    <button className="icon-circle-button rounded-full" onClick={onClick}>
      <span className="icon">{icon}</span>
    </button>
  );
};

export default IconCircle;
