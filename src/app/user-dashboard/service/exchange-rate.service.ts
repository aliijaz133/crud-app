import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiToken = 'efff8a5d6eb05010343578a85f';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

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
      // console.error('Error retrieving exchange rate');
      this.toastr.error('Error retrieving exchange rate.',fromCurrency)
      return 0;
    }
  }
}
