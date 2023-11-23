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

    try {
      const response = await this.http.get(url).toPromise();
      const responseData = response as {
        data: { rates: Record<string, number> };
      };

      if (responseData && responseData.data && responseData.data.rates) {
        const rates = responseData.data.rates;
        return rates[fromCurrency];
      } else {
        this.toastr.error(
          'Invalid response format from the API.',
          fromCurrency
        );
        return 0;
      }
    } catch (error) {
      console.error('Error retrieving exchange rate', error);
      this.toastr.error(
        'Error retrieving exchange rate. See console for details.',
        fromCurrency
      );
      return 0;
    }
  }
}
