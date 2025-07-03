import React from 'react';
import i18n from '../../i18n';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import AppButton from '../button/app_button';
import { useNavigate } from 'react-router-dom';


interface ChartSettingsOverviewProps {
    onBack: () => void
}


const ChartSettingsOverview: React.FC<ChartSettingsOverviewProps> = ({onBack}) => {
    const navigate = useNavigate();

    const dateRange = useSelector((state: RootState) => state.dateRangeSlice);
    const ticker = useSelector((state: RootState) => state.tickerSlice);


    return (
       <div style={{ paddingLeft: '24px', flexDirection: 'column', paddingBottom: 20}}>
        <h2 style={{ display: 'flex', justifyContent: 'center' }}>{i18n.t('chart_data_3_title')}</h2>

        <h3 style={{textAlign: 'left', margin: 0, padding: 0}}>{i18n.t('chart_data_3_ticker')}</h3>
        <p style={{textAlign: 'left', margin: 0, padding: 0}}>{ticker.selectedItem?.toString()}</p>
        <h3 style={{textAlign: 'left', margin: 0, padding: 0}}>{i18n.t('chart_data_3_date_range')}</h3>
        <p style={{textAlign: 'left', margin: 0, padding: 0}}>{new Intl.DateTimeFormat('en-GB').format(dateRange.startDate)} - {new Intl.DateTimeFormat('en-GB').format(dateRange.endDate)}</p>

        <p style={{textAlign: 'left', color: '#c51515', fontSize: 20, fontWeight: '500' }}>{i18n.t('chart_data_3_note')}</p>
        
        <div style={{flex: 'display', flexDirection: 'row', marginTop: 'auto'}}>
            <AppButton 
                text={i18n.t('chart_data_back_button')}
                onClick={() => onBack()}
                style={{marginRight: 20, width: '30%', backgroundColor: 'gray'}}
            
            />
            <AppButton 
                text='Start'
                onClick={() => {navigate("/chart")}}
                style={{width: '30%', backgroundColor: 'green'}}
            />
        </div>
</div>

    );
};

export default ChartSettingsOverview;