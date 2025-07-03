import { createSlice } from "@reduxjs/toolkit";
import { format } from 'date-fns';


interface DateRangeState {
    //minimum value of start date (5 years in history)
    minStartDate: Date,
    //actual value of start date
    startDate: Date;
    //maximum user can selected start date
    maxStartDate: Date;
    //actual value of end date
    endDate: Date;
    //maximum date user can select for end date
    maxEndDate: Date;
    error: string | null
}
const minStartDate = new Date();
minStartDate.setFullYear(minStartDate.getFullYear() - 6)


const maxStartDate = new Date();
maxStartDate.setMonth(maxStartDate.getMonth() - 5)


const maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() - 2)

const initialState: DateRangeState = {
    minStartDate: minStartDate,
    startDate: maxStartDate,
    maxStartDate: maxStartDate,
    endDate: maxDate,
    maxEndDate: maxDate,
    error: null
}

function isAtLeastOneMonthBefore(startDate: Date, endDate: Date): boolean {
  const oneMonthLater = new Date(startDate);
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

  return oneMonthLater <= endDate;
}

function getRandomDateRange(): { startDate: Date; endDate: Date } {
  const today = new Date();

  // Calculate the latest possible end date (2 months ago from today)
  const latestEnd = new Date(today);
  latestEnd.setMonth(latestEnd.getMonth() - 2);

  // Calculate the earliest possible end date (let's say 1 year ago)
  const earliestEnd = new Date(today);
  earliestEnd.setMonth(earliestEnd.getMonth() - 12);

  // Random end date between 12 and 2 months ago
  const endDate = new Date(
    earliestEnd.getTime() + Math.random() * (latestEnd.getTime() - earliestEnd.getTime())
  );

  // Calculate earliest possible start date (3 months before endDate)
  const earliestStart = new Date(endDate);
  earliestStart.setMonth(earliestStart.getMonth() - 9); // add buffer for randomness

  const latestStart = new Date(endDate);
  latestStart.setMonth(latestStart.getMonth() - 3);

  // Random start date between 12 and 3 months before endDate
  const startDate = new Date(
    earliestStart.getTime() + Math.random() * (latestStart.getTime() - earliestStart.getTime())
  );

  return { startDate, endDate };
}

const dateRangeSlice = createSlice({
    name: "dateRange",
    initialState,
    reducers: {
        setStartDate: (state, action) => {
            const validDuration = isAtLeastOneMonthBefore(action.payload, state.endDate);
            if(validDuration) {
                state.startDate = action.payload;
            }
            else {
                state.error = "Start date must be at least a month before the end date."
            }
        },
        setEndDate: (state, action) => {
            const date = action.payload;
            if(date > state.maxEndDate) {
                return;
            }
            const validDuration = isAtLeastOneMonthBefore(state.startDate, action.payload);
            if(validDuration) {
                state.endDate = action.payload   
            }
            else [
                state.error = "Start date must be at least a month before the end date."
            ]
        },
        setRandomRange: (state) => {
            const {startDate, endDate } = getRandomDateRange();
            state.startDate = startDate
            state.endDate = endDate
        }
    }
});

export function chartDateFormatter(date: Date): string{
    return format(date, 'yyyy-MM-dd')
}
export const {setStartDate, setEndDate, setRandomRange} = dateRangeSlice.actions
export default dateRangeSlice.reducer;