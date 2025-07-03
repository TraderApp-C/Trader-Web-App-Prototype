import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTickerDetails, fetchTickers } from "../../api/ticker_api";
import { RootState } from "../store";
import TickerModel from "../../api/ticker_model";

const types = ["stocks", "options", "crypto", "fx", "indices"] as const;
type Option = typeof types[number];

export const fetchTickersTunk = createAsyncThunk<
  any[],
  string,
  { state: RootState; rejectValue: string }
>('search/fetchResults', async (_market, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    return await fetchTickers(state.tickerSlice.type, state.tickerSlice.query);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const fetchTickerBySimbol = createAsyncThunk<
  TickerModel,
  void,
  { state: RootState; rejectValue: string }
>('search/fetchTickerDetails', async (_market, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const ticker = state.tickerSlice.randomTicker ?? ""
    return  await fetchTickerDetails(ticker)
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

interface TickerSearchState {
    type: Option;
    query: string;
    options: Option[],
    items: any[],
    loading: boolean,
    error: string | null,
    selectedItem?: TickerModel | null,
    randomTicker?: string | null
}

const tickers: string[] = ["AAPL","MSFT","AMZN","GOOGL","TSLA","NVDA","META","BRK.B","JPM","JNJ","V","WMT","PG","DIS","XOM"];

const initialState: TickerSearchState = {
    type: types[0],
    query: "",
    options: ["stocks", "options", "crypto", "fx", "indices"] as const,
    items: [],
    loading: false,
    error: null,
    selectedItem: null
}

const tickerSlice = createSlice({
    name: "tickerSearch",
    initialState,
    reducers: {
        setTickerType: (state, action) => {
            state.type = action.payload
            
        },
        setQuery: (state, action) => {
            state.query = action.payload
            if(state.query.length == 0) {
              state.items = []
            }
            state.selectedItem = null
        },
        selectItem: (state, action) => {
          state.selectedItem = action.payload
        },
        selectRandomSymbol: (state) => {
          state.randomTicker = tickers[Math.floor(Math.random() * tickers.length)]

        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTickersTunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTickersTunk.fulfilled, (state, action: PayloadAction<TickerModel[]>) => {
          state.items = action.payload ?? []
  
          state.loading = false;
        })
        .addCase(fetchTickersTunk.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchTickerBySimbol.fulfilled, (state, action: PayloadAction<TickerModel>) => {
          state.selectedItem = action.payload
          console.log("seetting selected ticker to ", state.selectedItem)
          state.loading = false;
        })

    },
})


// Create the custom selector (getter) inside the same file
export const inputValue = (state: RootState) => {
  const slice = state.tickerSlice
  return slice.selectedItem == null ? slice.query : slice.selectedItem!.toString();
};
export const {setTickerType, setQuery, selectItem, selectRandomSymbol} = tickerSlice.actions;
export default tickerSlice.reducer;

