import React from 'react';
import LegendItem from './legend_item';
import i18n from '../../i18n';

const BacktestingLegend: React.FC = () => {
  return (
     <div style={{textAlign: 'start', paddingTop: '52px', alignItems: 'end'}}>
          <LegendItem 
           first={i18n.t("chart_timeframe_title")}
           second={i18n.t("chart_timeframe_desc")}
        />
        <LegendItem 
          first={i18n.t("chart_option_title")}
          second={i18n.t("chart_option_desc")}
        />
        <LegendItem 
          first={i18n.t("chart_play_title")}
          second={i18n.t("chart_play_desc")}
        />
        <p><b style={{paddingLeft: '16px', paddingBottom: '20px'}}>{i18n.t("chart_legend_lines")}</b></p>
    
        <LegendItem 
          first={i18n.t("chart_take_profit_title")}
          second={i18n.t("chart_take_profit_desc")}
        />
        <LegendItem 
          first={i18n.t("chart_stop_loss_title")}
          second={i18n.t("chart_stop_loss_desc")}
        />
      </div>
  );
};

export default BacktestingLegend;