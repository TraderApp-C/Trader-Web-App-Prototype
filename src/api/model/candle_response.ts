export default interface ApiCandleResponse {
  c: number;   // close price
  h: number;   // high price
  l: number;   // low price
  n: number;   // number of trades
  o: number;   // open price
  t: number;   // timestamp in milliseconds
  v: number;   // volume
  vw: number;  // volume weighted average price
}