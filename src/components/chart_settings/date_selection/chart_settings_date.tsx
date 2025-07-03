import { useSelector } from "react-redux";
import { RootState } from '../../../store/store';
import { useAppDispatch } from '../../../store/hooks';
import i18n from '../../../i18n';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../App.css';
import { setEndDate, setStartDate } from '../../../store/tickerSearchSlice/rangeSlice';
import AppButton from "../../button/app_button";
import "../form.css";
import TipsList from "./tips_list";
import DatePickerWithTitle from "./settings_date_component";


interface ChartSettingsDateProps {
  onNext: () => void;
  onPrevious: () => void
}



const ChartSettingsDate: React.FC<ChartSettingsDateProps> = ({onNext, onPrevious}) => {

  const state = useSelector((state: RootState) => state.dateRangeSlice);
  const dispatch = useAppDispatch();


  return (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    height: '470px',
    padding: '16px',
    alignItems: 'center',
    boxSizing: 'border-box',
  }}>
    <h3>{i18n.t("chart_data_2_title")}</h3>

    <div  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>

      <DatePickerWithTitle 
        title={i18n.t('chart_data_2_start_date')}
        selected={state.startDate}
        onChange={(date) => dispatch(setStartDate(date))}
        startDate={state.minStartDate}
        endDate={state.maxStartDate}
        placeholderText={i18n.t("chart_data_2_start_date_picker")}
      />
      
    </div>

    <DatePickerWithTitle 
        title={i18n.t('chart_data_2_end_date')}
        selected={state.endDate}
        onChange={(date) => dispatch(setEndDate(date))}
        endDate={state.maxEndDate}
        placeholderText={i18n.t("chart_data_2_end_date_picker")}
      />

        <TipsList/>
    
    <div style={{ flexGrow: 1 }} />

    <div className="buttonRow" style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
      <AppButton
        text={i18n.t('chart_data_back_button')}
        onClick={() => onPrevious()}
      />
      <AppButton
        text={i18n.t('chart_data_next_button')}
        onClick={() => onNext()}
      />
    </div>
  </div>
);
}

export default ChartSettingsDate;