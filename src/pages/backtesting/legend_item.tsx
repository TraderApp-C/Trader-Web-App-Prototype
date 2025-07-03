import React from 'react';

interface LegendItemProps {
  first: string;
  second: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ first, second }) => {
  return (
    <div style={{alignItems: 'start', justifyItems: 'start', textAlign: 'start', color: 'white'}}>
      <b>{first}</b>
      <p style={{fontSize: '14px'}}>{second}</p>
    </div>
  );
};

export default LegendItem;