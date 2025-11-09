
import AppButton from '../button/app_button';
import { FaChartLine, FaMagic } from 'react-icons/fa';
import i18n from '../../i18n';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchTickerBySimbol, selectItem, selectRandomSymbol, setQuery } from '../../store/tickerSearchSlice/tickerSlice';
import { setRandomRange } from '../../store/tickerSearchSlice/rangeSlice';
import { useNavigate } from 'react-router-dom';

interface ChartTypeProps {
    normalClick: () => void
}

const ChartType: React.FC<ChartTypeProps> = ({normalClick}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingBottom: '20px'}}>
      <h3 style={{ color: "#FFFFFF" }}>
          {i18n.t("chart_type_title")}
      </h3>
      <div style={{display: 'flex', flexDirection: 'row', paddingBottom: '6px'}}>
        <AppButton
        onClick={() => {
          dispatch(selectItem(null))
          dispatch(setQuery(""))
          normalClick()
        }}
        text=''
        style={{width: 300 }}
        >
            {i18n.t("chart_type_normal")}
        <FaChartLine style={{marginLeft: '12px'}}/>
      </AppButton>
      </div>
      <p style={{ margin: 0, marginBottom: '12px', padding: 0, color: '#6b7280', fontWeight: '600', fontStyle: 'italic'}}>{i18n.t('chart_type_normal_desc')}</p>
      <AppButton 
        onClick={async () => {
          dispatch(selectRandomSymbol())
          dispatch(setRandomRange())
          await dispatch(fetchTickerBySimbol()).unwrap()
          navigate("chart")
        }}
        text=""
        style={{width: 300, marginTop: '12px', marginBottom: '6px'}}
      >
        {i18n.t("chart_type_random")}
        <FaMagic style={{marginLeft: '12px' }}/>
      </AppButton>
      <p style={{ margin: 0, marginBottom: '12px', padding: 0, color: '#6b7280', fontWeight: '600', fontStyle: 'italic'}}>{i18n.t('chart_type_random_desc')}</p>
    
    </div>
  );
};

export default ChartType;