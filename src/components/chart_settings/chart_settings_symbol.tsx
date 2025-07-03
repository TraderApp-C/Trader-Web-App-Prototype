import React, { useEffect } from 'react';
import i18n from '../../i18n'; // Correct relative path to reach the 'src/i18n.ts' file
import AppTextInput from '../AppTextInput';
import TickerType from './ticker_type';
import './form.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../store/hooks';
import { fetchTickersTunk, selectItem, setQuery, setTickerType, inputValue } from '../../store/tickerSearchSlice/tickerSlice';
import TickerListItem from './ticker_item';
import TickerModel from '../../api/ticker_model';
import AppButton from '../button/app_button';

let debounceTimer: ReturnType<typeof setTimeout>;


interface ChartSettingsDateProps {
  onNext: () => void;
  onPrevious: () => void
}

const ChartSettingsSymbol: React.FC<ChartSettingsDateProps> = ({onNext, onPrevious}) => {
  
    const state = useSelector((state: RootState) => state.tickerSlice)
    const customValue = useSelector(inputValue);

    const dispatch = useAppDispatch();

  
    useEffect(() => {
      if (state.query.trim().length > 1) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          dispatch(fetchTickersTunk(state.query));
        }, 500); // 1500ms debounce
      }
      return () => clearTimeout(debounceTimer);
    }, [state.query, dispatch]);

    return (
      <div style={{paddingBottom: 20}}>
        <h3>{i18n.t('chart_data_1_title')}</h3>
      
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '16px', justifyContent: 'center'}}>
      {state.options.map((option) => (
        <TickerType
          title={option}
          selected={state.type === option}
          description=""
          onClick={() => {
            dispatch(setTickerType(option))
            if(state.query.length > 1) {
              dispatch(fetchTickersTunk(state.query))
            }
          }
        }/>
      ))}

    </div>
        <div>
          <AppTextInput 
          onChange={ (text: string) => dispatch(setQuery(text))}
          placeholder={i18n.t('chart_data_1_hint')}
          value={customValue}
          style={{width: '90%'}}
        
          />
        
        </div>  
      {state.selectedItem === null && state.items.length > 0 && (
  <div
    style={{
      maxHeight: "180px",
      overflowY: "scroll",
      border: "1px solid #ccc",
      borderRadius: "8px",
      width: '90%',
      marginTop: "16px",
      margin: 'auto'
    }}
  >
    {state.items.map((item: TickerModel, idx) => (
      <TickerListItem
        key={item.ticker ?? idx}
        ticker={item.ticker}
        name={item.name}
        exchange={item.primary_exchange}
        type={item.type}

        onTap={() => {
          dispatch(selectItem(item));
          setTimeout(() => {
            dispatch(fetchTickersTunk(state.query));
          }, 400);
        }}
      />
    ))}
  </div>
)}

  <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center', marginTop: '12px'}}> 

     <AppButton 
        text={i18n.t("chart_data_back_button")}
        onClick={() => onPrevious()}
        style={{marginRight: '12px'}}
      />
    {state.selectedItem != null && <AppButton 
              text={i18n.t('chart_data_next_button')}
              onClick={() => onNext()}
              style={{marginTop: 'auto'}}
          /> }
    
         
  </div>
    </div>
    );
  };
  
  export default ChartSettingsSymbol;