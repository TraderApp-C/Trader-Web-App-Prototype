import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleInfoDialog } from "../../../store/chartSlice/price_slice";
import { RootState } from "../../../store/store";
import i18n from "../../../i18n";
import LegendItem from "../legend_item";

const BacktestingInfoDialog: React.FC = () => {
    const dispatch = useDispatch();
    const priceSlice = useSelector((state: RootState) => state.priceSlice)
    return (
        <div>
        <Dialog 
            open={priceSlice.infoDialog} 
            onClose={() => dispatch(toggleInfoDialog())} 
            slotProps={{
                paper: {
                sx: { borderRadius: '24px', backgroundColor: '#242424',  },
                },
            }
        }
            maxWidth="xs"     
            fullWidth={true}  
    >
            <DialogTitle sx={{ textAlign: 'center', color: 'white' }}>{i18n.t("chart_info_dialog_title")}</DialogTitle>
            <DialogContent>
                <div style={{textAlign: 'start', alignItems: 'center'}}>
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
                    <p style={{color: 'white'}}><b style={{paddingBottom: '20px'}}>{i18n.t("chart_legend_lines")}</b></p>
                
                    <LegendItem 
                    first={i18n.t("chart_take_profit_title")}
                    second={i18n.t("chart_take_profit_desc")}
                    />
                    <LegendItem 
                    first={i18n.t("chart_stop_loss_title")}
                    second={i18n.t("chart_stop_loss_desc")}
                    />
      </div>
            </DialogContent>
            {/* <DialogActions>
            <Button onClick={() => dispatch(toggleInfoDialog())}>{i18n.t("Back to chart")}</Button>
            
            </DialogActions> */}
        </Dialog>
        </div>
    );
};

export default BacktestingInfoDialog;