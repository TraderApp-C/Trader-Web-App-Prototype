// src/components/Chart.tsx
import React, { useEffect, useRef } from 'react';
import { CandlestickSeries, createChart, CreatePriceLineOptions, IPriceLine, ISeriesApi, MouseEventParams, Time } from 'lightweight-charts';
import { useAppDispatch } from '../../store/hooks';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store/store';
import { fetchCandleStickData, fetchRemainingData, formatCandleData,} from '../../store/chartSlice/chart_slice';
import { chartDateFormatter } from '../../store/tickerSearchSlice/rangeSlice';
import { CircularProgress } from '@mui/material'
import { FormControlLabel, Switch } from '@mui/material'
import TimespanDropdown from '../../components/timespan_dropdown';
import { setPriceLine, toggleDrawing, toggleInfoDialog, TradingPriceLine } from '../../store/chartSlice/price_slice';
import i18n from '../../i18n';
import PlaySingleBarButton from './components/play_single_bar';
import BarReplayButton from './components/bar_replay';
import ClearLinesButton from './components/clear_lines_button';
import BacktestingDialog from './components/backtesting_dialog';
import { FaQuestion } from 'react-icons/fa';
import BacktestingInfoDialog from './components/info_dialog';

const BacktestingChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const tickerSlice = useSelector((state: RootState) => state.tickerSlice)
  const rangeSlice = useSelector((state: RootState) => state.dateRangeSlice)
  const state = useSelector((state: RootState) => state.chartSlice)
  const priceSlice = useSelector((state: RootState) => state.priceSlice)

  useEffect(() => {
    
    dispatch(fetchCandleStickData({
      symbol: tickerSlice.selectedItem!.ticker,
      multiplier: state.multiplier,
      timespan: state.timespan,
      from: chartDateFormatter(rangeSlice.startDate),
      to: chartDateFormatter(rangeSlice.endDate)
    }));
    dispatch(fetchRemainingData({
      symbol: tickerSlice.selectedItem!.ticker,
      multiplier: state.multiplier,
      timespan: state.timespan,
      from: chartDateFormatter(rangeSlice.endDate),
      to: chartDateFormatter(new Date())
    }));
}, []);

  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) {
      return;
    }
    
    const chart = createChart(chartContainerRef.current, {
      width: 1200,
      height: 600,
      
    });

    chart.subscribeClick((param: MouseEventParams<Time>) => {
      const drawingEnabled = store.getState().priceSlice.drawingEnabled
      if (!param.point || !drawingEnabled) {
        return;
      }
      const price = candlestickSeriesRef.current!.coordinateToPrice(param.point!.y)
    
      const priceLineOptions: CreatePriceLineOptions = {
          price: price!,
          color: '#3179F5',
          lineWidth: 2,
          lineStyle: 0,
          axisLabelVisible: true,
          title: 'Price',
        };
        
        if(candlestickSeriesRef.current != null && (store.getState().priceSlice.firstLine == null || store.getState().priceSlice.secondLine == null)) {
          const createdPriceLine : IPriceLine= candlestickSeriesRef.current!.createPriceLine(priceLineOptions);  
          const priceLine: TradingPriceLine = {
            priceLine: createdPriceLine,
            options: priceLineOptions
          }
          dispatch(setPriceLine(priceLine))

        }
      
    });

    candlestickSeriesRef.current = chart.addSeries(CandlestickSeries, {
        upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
        wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    });
    
    candlestickSeriesRef.current.setData(formatCandleData(state.data));

  
    candlestickSeriesRef.current.applyOptions({
      lastValueVisible: false,
      priceLineVisible: false,
    });

  
      const resizeObserver = new ResizeObserver(() => {
        chart.applyOptions({ width: chartContainerRef.current?.clientWidth, height: 600 });
      });

      resizeObserver.observe(chartContainerRef.current);
    
      chart.timeScale().fitContent();

      return () => {
        resizeObserver.disconnect();
        chart.remove();
      };
  }, [state.data]);


  useEffect(() => {
  if (!candlestickSeriesRef.current) return;

  if(priceSlice.firstLine != null) {
    candlestickSeriesRef.current!.createPriceLine(priceSlice.firstLine?.options!);
  }
  if(priceSlice.secondLine != null) {
    candlestickSeriesRef.current!.createPriceLine(priceSlice.secondLine?.options!);
  }
   
      
  
}, [priceSlice.triggerValue]);
  

  return <div style={{ width: '100vw', height: '100vh', display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <BacktestingDialog/>
            <BacktestingInfoDialog/>
        </div>

    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center'}}>
      <div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        {/* Ticker symbol and timespan dropdown */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <button style={{fontSize: '18px', marginBottom: '16px', backgroundColor: 'black', color: 'white'}} >{tickerSlice.selectedItem!.ticker}</button>
         <TimespanDropdown />
        </div>

        <ClearLinesButton ref={candlestickSeriesRef.current!}/>

         <FormControlLabel
         style={{paddingBottom: '12px', marginLeft: '16px', color: 'white'}}
          control={
            <Switch
              checked={priceSlice.drawingEnabled}
              
              onChange={() => dispatch(toggleDrawing())}/>
          }
          label={i18n.t("chat_drawing_enabled")}/>

          {state.loading ? (<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: '12px'}}>
            <p style={{paddingRight: '12px', color: 'white'}}>{i18n.t("chart_loading_data")}</p> 
            <CircularProgress style={{color: 'white'}}/>
          </div>) : (<></>)}

        {/* Replay buttons, placed at the end */}
        <div style={{ flexDirection:'row', display: 'flex', gap: '0.5rem',flex: 1, marginBottom: '16px', alignItems: 'end', justifyContent: 'end'}}>
          <PlaySingleBarButton 
            ref={candlestickSeriesRef.current!}/>
      
          <BarReplayButton 
            ref={candlestickSeriesRef.current!}
            />

            <button style={{backgroundColor: '#1a1a1a'}} onClick={() => dispatch(toggleInfoDialog())}><FaQuestion style={{color: 'white'}}/></button>
        </div>

      </div>      
        <div ref={chartContainerRef} style={{ width: '100%', maxWidth: '1200px', height: '600px'}} />
      
      </div>
        
        </div>
        
    </div>
    
};

export default BacktestingChart;