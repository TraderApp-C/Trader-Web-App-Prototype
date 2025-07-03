import {configureStore} from "@reduxjs/toolkit";

import tickerSlice from "./tickerSearchSlice/tickerSlice"
import dateRangeSlice from "./tickerSearchSlice/rangeSlice";
import chartSlice from "./chartSlice/chart_slice";
import priceSlice from "./chartSlice/price_slice";

export const store = configureStore({
    reducer: {
        tickerSlice: tickerSlice,
        dateRangeSlice: dateRangeSlice,
        chartSlice: chartSlice,
        priceSlice: priceSlice
    },
    //reserved for DI
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch