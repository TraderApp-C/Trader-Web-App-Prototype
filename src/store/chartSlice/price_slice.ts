import { createSlice } from "@reduxjs/toolkit";
import { CreatePriceLineOptions, IPriceLine } from "lightweight-charts";
import i18n from "../../i18n";

export interface TradingPriceLine {
    priceLine: IPriceLine | null,
    options: CreatePriceLineOptions | null
}


interface PriceState {
    drawingEnabled: boolean,
    firstLine: TradingPriceLine | null;
    secondLine: TradingPriceLine | null,
    dialogVisible: boolean,
    dialogMessage: string | null,
    infoDialog: boolean,
    triggerValue: number,
}

const initialState: PriceState = {
    drawingEnabled: false,
    firstLine: null,
    secondLine: null,
    dialogVisible: false,
    dialogMessage: null,
    infoDialog: false,
    triggerValue: 0
}

const priceSlice = createSlice({
    name: "price-lines",
    initialState,
    reducers: {
        setPriceLine: (state, action) => {
            if(state.firstLine == null) {
                state.firstLine = action.payload;
            }
            else {
                state.secondLine = action.payload;
            }
        },
        clearLines: (state) => {
            state.firstLine = null
            state.secondLine = null
        },
        toggleDrawing: (state) => {
            state.drawingEnabled = !state.drawingEnabled;
        },
        setPriceDialog: (state, action) => {
            state.dialogMessage = action.payload
            state.dialogVisible = true
        },
        hidePriceDialog: (state) => {
            state.dialogMessage = null
            state.dialogVisible = false
        },
        toggleInfoDialog: (state) => {
            state.infoDialog = !state.infoDialog
        },
        checkCandlestick: (state, action) => {
            
            if(state.firstLine == null || state.secondLine == null || state.firstLine.options == null || state.secondLine.options == null) {
                return;
            }

            const topLine = Math.max(state.firstLine.options.price, state.secondLine.options.price)
            const bottomLine = Math.min(state.firstLine.options.price, state.secondLine.options.price)
        
            //compare to first line, we'll call it top line
            if(action.payload.high > topLine || action.payload.low > topLine) {
                state.dialogMessage = i18n.t("top_line_breached")
                state.dialogVisible = true
            }
            if(action.payload.high < bottomLine || action.payload.low < bottomLine) {
                state.dialogMessage = i18n.t("bottom_line_breached")
                state.dialogVisible = true
            }
        },
        redrawLines: (state) => {
            state.triggerValue += 1
        }
        
    },
})
export const {setPriceLine, toggleDrawing, clearLines, setPriceDialog, hidePriceDialog, checkCandlestick, toggleInfoDialog, redrawLines} = priceSlice.actions
export default priceSlice.reducer;