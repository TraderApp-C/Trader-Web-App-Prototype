import { FaTrash } from "react-icons/fa";
import i18n from "../../../i18n";
import { useDispatch, useSelector } from "react-redux";
import { clearLines } from "../../../store/chartSlice/price_slice";
import { RootState } from "../../../store/store";
import { ISeriesApi } from "lightweight-charts";

interface ClearLinesProps {
    ref: ISeriesApi<'Candlestick'>,
}


const ClearLinesButton: React.FC<ClearLinesProps> = ({ref}) => {
    const dispatch = useDispatch();
    const priceSlice = useSelector((state: RootState) => state.priceSlice)
    return (
        <button onClick={() => {
            if(priceSlice.firstLine != null) {
                if(priceSlice.firstLine.priceLine != null) {
                    ref.removePriceLine(priceSlice.firstLine!.priceLine!)
                 }
                if(priceSlice.secondLine?.priceLine != null) {
                    ref.removePriceLine(priceSlice.secondLine!.priceLine!)
                }
            }
            dispatch(clearLines())

        }} style={{marginBottom: '16px', marginLeft: '16px', backgroundColor: 'black', color: 'white'}}> <FaTrash /> {i18n.t("chart_clear_lines")}</button>
    );
};

export default ClearLinesButton;