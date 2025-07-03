import { ISeriesApi } from 'lightweight-charts';
import React from 'react';
import { RootState, store } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { extractBars, formatCandleData, playTillEnd, removeRemaining } from '../../../store/chartSlice/chart_slice';
import { checkCandlestick } from '../../../store/chartSlice/price_slice';
import { FaPause, FaPlay } from 'react-icons/fa';
import i18n from '../../../i18n';

interface BarReplayProps {
    ref: ISeriesApi<'Candlestick'>,

}

const BarReplayButton: React.FC<BarReplayProps> = ({ref}) => {
    const dispatch = useDispatch();
    const isPlaying = useSelector((state: RootState) => state.chartSlice.isPlaying);
    return <>
     <button onClick={() => {
            if(store.getState().chartSlice.isPlaying) {
              dispatch(playTillEnd(false));
              return;  
            }
            dispatch(playTillEnd(true));
            const interval = setInterval(() => {
              const liveState = store.getState().chartSlice;
              if ( !liveState.isPlaying || liveState.remainingData.length === 0) {
                dispatch(playTillEnd(false))
                clearInterval(interval);
                return;
              }
              const bars = extractBars(liveState, 1)
              const formattedData = formatCandleData(bars)
              if(ref != null && formattedData.length > 0) {
                ref?.update(formattedData[0])
                dispatch(checkCandlestick(formattedData[0]))
                if(store.getState().priceSlice.dialogVisible) {
                  dispatch(playTillEnd(false))
                  dispatch(removeRemaining(1))
                  clearInterval(interval)
                  return;
                }
                dispatch(removeRemaining(1))
              }
              
            }, 100);
            
          }}>
            {isPlaying ? <FaPause /> : <FaPlay />} {isPlaying ? i18n.t("chart_backtesting_pause") : i18n.t("chart_backtesting_play")}
            </button></>
};

export default BarReplayButton;