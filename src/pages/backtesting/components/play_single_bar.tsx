import React from 'react';
import { store } from '../../../store/store';
import { extractBars, formatCandleData, removeRemaining } from '../../../store/chartSlice/chart_slice';
import { useDispatch } from 'react-redux';
import { checkCandlestick } from '../../../store/chartSlice/price_slice';
import { CandleStick } from '../../../api/model/candle_stick';
import { FaForwardStep } from 'react-icons/fa6';
import { ISeriesApi } from 'lightweight-charts';

interface SingleBarProps {
    ref: ISeriesApi<'Candlestick'>,

}

const PlaySingleBarButton: React.FC<SingleBarProps> = ({ref}) => {
    const dispatch = useDispatch();
  return (
    <>
     <button style={{backgroundColor: '#1a1a1a'}} onClick={() => {
        const state = store.getState().chartSlice; 
        const bars = extractBars(state, 1);
        const formattedData = formatCandleData(bars)
        
        if(formattedData.length > 0) {
        formattedData.forEach(bar => {
            ref.update(bar);
        });
        const candlestick: CandleStick = state.remainingData[0]
        dispatch(checkCandlestick(candlestick))
        dispatch(removeRemaining(1))
        }
    
    }}><FaForwardStep style={{color: 'white'}}/></button>
    </>
  );
};

export default PlaySingleBarButton;