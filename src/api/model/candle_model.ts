import ApiCandleResponse from "./candle_response";
import { CandleStick } from "./candle_stick";

 export class CandleModel {
  constructor(
    public close: number,
    public high: number,
    public low: number,
    public trades: number,
    public open: number,
    public timestamp: number,
    public volume: number,
    public volumeWeightedAverage: number
  ) {}

  // Static method to create a CandleModel from the raw API response
  static fromJson(json: ApiCandleResponse): CandleModel {
    return new CandleModel(
      json.c,
      json.h,
      json.l,
      json.n,
      json.o,
      json.t,
      json.v,
      json.vw
    );
  }

  // Convert to TradingView-compatible CandleStick format
  toCandleStick(): CandleStick {
    return {
      time: Math.floor(this.timestamp / 1000),
      open: this.open,
      high: this.high,
      low: this.low,
      close: this.close,
      volume: this.volume
    };
  }
}
