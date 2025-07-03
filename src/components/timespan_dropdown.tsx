import React from 'react';
import { chartTimespans, ChartTimespan } from '../api/model/chart_timespan';
import { useAppDispatch } from '../store/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchCandleStickData, fetchRemainingData, playTillEnd, setTimespan } from '../store/chartSlice/chart_slice';
import { chartDateFormatter } from '../store/tickerSearchSlice/rangeSlice';
import './chart/chart_option.css'
import i18n from '../i18n';



const TimespanDropdown = () => {
  

  const dispatch = useAppDispatch();
  const state = useSelector((state: RootState) => state.chartSlice)
  const tickerSlice = useSelector((state: RootState) => state.tickerSlice)
  const rangeSlice = useSelector((state: RootState) => state.dateRangeSlice)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (event.target.value) as ChartTimespan;
    dispatch(playTillEnd  (false))
    dispatch(setTimespan(value))
    console.log("fetching OHLC data")
    console.log("start date ", chartDateFormatter(rangeSlice.startDate))
    console.log("end date ", chartDateFormatter(rangeSlice.endDate))
    console.log("timespan is ", value)
    dispatch(fetchCandleStickData({
      symbol: tickerSlice.selectedItem!.ticker,
      multiplier: state.multiplier,
      timespan: value,
      from: chartDateFormatter(rangeSlice.startDate),
      to: chartDateFormatter(rangeSlice.endDate)
    }));
    dispatch(fetchRemainingData({
      symbol: tickerSlice.selectedItem!.ticker,
      multiplier: state.multiplier,
      timespan: value,
      from: chartDateFormatter(rangeSlice.endDate),
      to: chartDateFormatter(new Date())
    }));
  };


  return (
    <div>
      <label htmlFor="dropdown">{i18n.t('chart_backtesting_timespan')}</label>
      <select id="timespandropdown" style={{borderRadius: '24px', padding: 6}} className='option' value={state.timespan} onChange={handleChange}>
        <option value="">-- Select --</option>
        {chartTimespans.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimespanDropdown;