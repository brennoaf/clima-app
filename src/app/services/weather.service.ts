import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeather(params: any): Observable<any> {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (Array.isArray(params[key])) {
        params[key].forEach((item: string) => {
          httpParams = httpParams.append(key, item);
        });
      } else {
        httpParams = httpParams.append(key, params[key]);
      }
    }

    return this.http.get<any>(this.baseUrl, { params: httpParams });
  }
}
