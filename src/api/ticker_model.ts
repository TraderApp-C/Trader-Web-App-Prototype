class TickerModel {
  constructor(
    public ticker: string,
    public name: string,
    public market: string,
    public locale: string,
    public primary_exchange: string,
    public type: string,
    public active: boolean,
    public currency_name: string,
    public cik: string,
    public composite_figi: string,
    public share_class_figi: string,
    public last_updated_utc: string
  ) {}

  static fromJson(json: any): TickerModel {
    return new TickerModel(
      json.ticker,
      json.name,
      json.market,
      json.locale,
      json.primary_exchange,
      json.type,
      json.active,
      json.currency_name,
      json.cik,
      json.composite_figi,
      json.share_class_figi,
      json.last_updated_utc
    );
  }

  public toString(): string {
    return `${this.ticker} - ${this.name}`;
  }
}

export default TickerModel;