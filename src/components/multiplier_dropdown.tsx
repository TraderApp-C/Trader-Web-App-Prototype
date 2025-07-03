import React from 'react';
import { ChartMultiplier, chartMultipliers } from '../api/model/chart_timespan';
import { useAppDispatch } from '../store/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchCandleStickData, fetchRemainingData, playTillEnd, setMultiplier } from '../store/chartSlice/chart_slice';
import { chartDateFormatter } from '../store/tickerSearchSlice/rangeSlice';
import './chart/chart_option.css'
import i18n from '../i18n';



const MultiplierDropdown = () => {
  

  const dispatch = useAppDispatch();
  const state = useSelector((state: RootState) => state.chartSlice)
  const tickerSlice = useSelector((state: RootState) => state.tickerSlice)
  const rangeSlice = useSelector((state: RootState) => state.dateRangeSlice)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value) as ChartMultiplier;
    dispatch(playTillEnd(false))
    dispatch(setMultiplier(value))
    dispatch(fetchCandleStickData({
      symbol: tickerSlice.selectedItem!.ticker,
      multiplier: value,
      timespan: state.timespan,
      from: chartDateFormatter(rangeSlice.startDate),
      to: chartDateFormatter(rangeSlice.endDate)
    }));
    dispatch(fetchRemainingData({
          symbol: tickerSlice.selectedItem!.ticker,
          multiplier: value,
          timespan: state.timespan,
          from: chartDateFormatter(rangeSlice.endDate),
          to: chartDateFormatter(new Date())
        }));
  };

  

  return (
    <div >
      <label htmlFor="dropdown">{i18n.t('chart_backtesting_multiplier')}</label>
      <select id="dropdown" style={{borderRadius: '24px', padding: 6}} className='option' value={state.multiplier} onChange={handleChange}>
        <option value="">-- Select --</option>
        {chartMultipliers.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiplierDropdown;