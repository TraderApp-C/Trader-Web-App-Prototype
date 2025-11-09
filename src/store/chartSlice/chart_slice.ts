import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CandleStick } from "../../api/model/candle_stick";
import { fetchCandles } from "../../api/chart_api";
import { ChartMultiplier, ChartTimespan } from "../../api/model/chart_timespan";
import { chartDateFormatter } from "../tickerSearchSlice/rangeSlice";
import { UTCTimestamp } from "lightweight-charts";


interface ChartState {
    
    data: CandleStick[],
    remainingData: CandleStick[],
    multiplier: ChartMultiplier,
    timespan: ChartTimespan,
    loading: boolean,
    error: string | null,
    isPlaying: boolean
}

const initialState: ChartState = {
    data: [],
    remainingData: [],
    multiplier: 1,
    timespan: 'hour',
    loading: true,
    error: null,
    isPlaying: false
}

export const fetchCandleStickData = createAsyncThunk<
  CandleStick[], // return type
  { symbol: string; multiplier: number; timespan: ChartTimespan; from: string; to: string } // argument type
>(
  'chart/fetchCandleStickData',
  async ({ symbol, multiplier, timespan, from, to }, thunkAPI) => {
    try {
    
      const data = await fetchCandles(symbol, multiplier, timespan, from, to);
      return data;
    } catch (error) {
        console.log("error s data")
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchRemainingData = createAsyncThunk<
  CandleStick[], // return type
  { symbol: string; multiplier: number; timespan: ChartTimespan; from: string; to: string } // argument type
>(
  'chart/fetchRemainingData',
  async ({ symbol, multiplier, timespan, from, to }, thunkAPI) => {
    try {
      const newFromDate: Date = new Date(from);
      newFromDate.setDate(newFromDate.getDate() + 1)
      const data = await fetchCandles(symbol, multiplier, timespan, chartDateFormatter(newFromDate), to);
      return data;
    } catch (error) {
        console.log("error s data")
      return thunkAPI.rejectWithValue(error);
    }
  }
);



// NOT a reducer — just a helper function
export function extractBars(state: ChartState, count: number): CandleStick[] {
  return state.remainingData.slice(0, count);
}

// Format the fetched data into the format expected by the TradingView Lightweight Chart
export function formatCandleData(candles: CandleStick[]) {
  return candles.map((candle) => ({
    time: candle.time as UTCTimestamp,
    open: candle.open,
    high: candle.high,
    low: candle.low,
    close: candle.close,
  }));
}


const chartSlice = createSlice({
    name: "chart",
    initialState,
    reducers: {
        setMultiplier: (state, action) => {
          state.multiplier = action.payload
        },
        setTimespan: (state, action) => {
          state.timespan = action.payload
        },
        removeRemaining: (state, action) => {
          state.remainingData.splice(0, action.payload)
        },
    
        //plays our the remaining
        playTillEnd: (state, action) => {
          //set the flag - invert icons
          state.isPlaying = action.payload
          
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCandleStickData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCandleStickData.fulfilled, (state, action: PayloadAction<CandleStick[]>) => {
          state.data = action.payload ?? []
          state.loading = false;
        })
        .addCase(fetchCandleStickData.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchRemainingData.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(fetchRemainingData.fulfilled, (state, action: PayloadAction<CandleStick[]>) => {
          state.remainingData = action.payload ?? []
          state.loading = false
        
          
        })
        .addCase(fetchRemainingData.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
})

export const {setMultiplier, setTimespan, playTillEnd, removeRemaining} = chartSlice.actions
export default chartSlice.reducer;