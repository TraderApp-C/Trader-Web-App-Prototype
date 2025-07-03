import axiosClient from "../axios/axios_polygon_client";
import TickerModel from "./ticker_model";

export const fetchTickers = async (market: string, search: string): Promise<TickerModel[]> => {
    const response = await axiosClient.get('/reference/tickers', {
      params: {
        market: market,
        search: search,
        active: true,
        sort: 'ticker',
        limit: 20
      },
    });
  
    const tickers = response.data?.results ?? [];
    return tickers.map(TickerModel.fromJson);
  };

  export const fetchTickerDetails = async (ticker: string): Promise<TickerModel> => {
  const response = await axiosClient.get(`/reference/tickers/${ticker}`);

  const result = response.data?.results;
  if (!result) {
    throw new Error("No ticker data found");
  }

  return TickerModel.fromJson(result);
};
  