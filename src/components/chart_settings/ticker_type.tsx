import React from 'react';
import SelectedTicker from './selected_ticker';

interface TickerTypeProps {
    title: string;
    description?: string;
    selected: boolean;
    onClick: () => void; 
}

const TickerType: React.FC<TickerTypeProps> = ({ title, description, selected, onClick }) => {
    description;
    return (
        <div onClick={onClick}
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start', 
            alignItems: 'center',
            cursor: 'pointer',
            margin: 0, 
            
        }}>
            <h3 style={{marginRight: 20}}>{title}</h3>         
            <SelectedTicker selected={selected} />
        </div>
    );
};

export default TickerType;