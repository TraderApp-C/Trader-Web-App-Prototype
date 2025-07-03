import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hidePriceDialog } from "../../../store/chartSlice/price_slice";
import { RootState } from "../../../store/store";
import i18n from "../../../i18n";


const BacktestingDialog: React.FC = () => {
    const dispatch = useDispatch();
    const priceSlice = useSelector((state: RootState) => state.priceSlice)
    return (
        <div>
        <Dialog open={priceSlice.dialogVisible} onClose={() => dispatch(hidePriceDialog())}>
            <DialogTitle>{i18n.t("price_line_reached")}</DialogTitle>
            <DialogContent>
            {priceSlice.dialogMessage}
            </DialogContent>
            <DialogActions>
            <Button onClick={() => dispatch(hidePriceDialog())}>{i18n.t("Back to chart")}</Button>
            
            </DialogActions>
        </Dialog>
        </div>
    );
};

export default BacktestingDialog;