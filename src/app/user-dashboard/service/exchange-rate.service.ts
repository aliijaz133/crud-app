import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiToken = 'efff8a5d6eb05010343578a85f';

  constructor(private http: HttpClient) {}

  async getExchangeRate(
    fromCurrency: string,
    toCurrency: string
  ): Promise<number> {
    const url =
      'https://v6.exchangerate-api.com/v6/33db014ce0eaac5fc7182133/latest/USD';
    const response = (await this.http.get(url).toPromise()) as {
      data: { rates: Record<string, number> };
    };

    if (response && response.data && response.data.rates) {
      const rates = response.data.rates;
      return rates[fromCurrency];
    } else {
      console.error('Error retrieving exchange rate');
      return 0;
    }
  }
}
