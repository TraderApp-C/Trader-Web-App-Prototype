import React from 'react';

interface SelectedTickerProps {
    selected: boolean;
}

const SelectedTicker: React.FC<SelectedTickerProps> = ({ selected }) => {
    return selected ? (
        <div
        style={{
          width: "18px",
          height: "18px",
          padding: "2px",
          borderRadius: "50%",
          border: "2px solid #c51515",
  
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            backgroundColor: "#c51515",
          }}
        />
        </div>
    ) : (
        <div
  style={{
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: "2px solid #c51515",
    padding: "2px",
  }}
/>
    );
};

export default SelectedTicker;