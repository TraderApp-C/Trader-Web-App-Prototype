
import { dataClient } from "../axios/axios_polygon_client";
import { CandleModel } from "./model/candle_model";
import { CandleStick } from "./model/candle_stick";
import ApiCandleResponse from "./model/candle_response";
import { ChartTimespan } from "./model/chart_timespan";


// Reusable function to fetch candles from the API
export const fetchCandles = async (
  symbol: string,
  multiplier: number,
  timespan: ChartTimespan,  
  from: string,      // format: 'YYYY-MM-DD'
  to: string         // format: 'YYYY-MM-DD'
): Promise<CandleStick[]> => {
  try {
   
    const response = await dataClient.polygionData.get(
      `aggs/ticker/${symbol}/range/${multiplier}/${timespan}/${from}/${to}`,
      {
        params: {
          adjusted: true,
          sort: 'asc',
          limit: 50000,
        },
      }
    );

    const results = response.data?.results ?? [];

    // Map through the results and call .fromJson on each item
    return results.map((json: ApiCandleResponse) => CandleModel.fromJson(json).toCandleStick());
  } catch (error) {
    console.error('Error fetching candles:', error);
    throw error;  // Rethrow the error to handle it at a higher level
  }
};