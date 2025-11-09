import React from 'react';

interface TickerListItemProps {
  ticker: string;
  name: string;
  exchange: string;
  type: string;
  onTap: () => void
}

const TickerListItem: React.FC<TickerListItemProps> = ({ ticker, name, exchange, type, onTap }) => {
  return (
  <div onClick={onTap} style={{ borderBottom: '1px solid #ccc', padding: '8px 0'}}>
    <strong style={{ color: 'white' }}>{ticker}</strong>
    {" - "}
    <span style={{ color: 'white' }}>{name}</span>

    <div style={{ fontSize: '12px', color: '#666' }}>
      Exchange: {exchange} | Type: {type}
    </div>
  </div>
);
};

export default TickerListItem;
