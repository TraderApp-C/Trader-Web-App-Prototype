

import React from 'react';
import i18n from '../../../i18n';

const TipsList: React.FC = () => {

    const tips = [i18n.t("chart_data_2_advice_1"),i18n.t("chart_data_2_advice_2"),i18n.t("chart_data_2_advice_3"),i18n.t("chart_data_2_advice_4"),i18n.t("chart_data_2_advice_5")];
    
  return (
    <div style={{textAlign: 'start'}}>
        <ol>
            {tips.map((item, index) => (
            <li key={index} style={{ color: '#6b7280', fontWeight: '600', fontStyle: 'italic'}}>{item}</li>
      ))}
        </ol>
    </div>
  );
};

export default TipsList;