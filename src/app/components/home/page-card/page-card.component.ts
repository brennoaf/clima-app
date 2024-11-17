import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { WeatherService } from '../../../services/weather.service';

import { WeatherIcons } from '../../../../../public/icons/weather-icons';

import { LocationsData } from '../../../data/locations.data';

import { HistoryService } from '../../../services/history.service';

@Component({
  selector: 'app-home-page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.scss']
})
export class HomePageCardComponent implements OnInit {
  countries: string[] = [];
  states: string[] = [];
  cities: string[] = [];

  selectedCountry: string = '';
  selectedState: string = '';
  selectedCity: string = '';

  weatherData: any;
  weatherSvgIcon: any = '';
  error: string = '';

  temperatureUnit: 'C' | 'F' = 'C';

  constructor(
    private weatherService: WeatherService, 
    private sanitizer: DomSanitizer, 
    private router: Router,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.getCountries();
  }

  toggleTemperatureUnit(): void {
    this.temperatureUnit = this.temperatureUnit === 'C' ? 'F' : 'C';
  }

  getCountries(): void {
    this.countries = Object.keys(LocationsData);
  }

  onCountryChange(): void {
    this.states = this.selectedCountry
      ? Object.keys(LocationsData[this.selectedCountry])
      : [];
    this.selectedState = '';
    this.selectedCity = '';
    this.cities = [];
  }

  onStateChange(): void {
    this.cities = this.selectedState
      ? Object.keys(LocationsData[this.selectedCountry][this.selectedState].cities)
      : [];
    this.selectedCity = '';
  }

  setCityCoordinate(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const city = target.value;

    if (
      this.selectedCountry &&
      this.selectedState &&
      LocationsData[this.selectedCountry][this.selectedState].cities[city]
    ) {
      const { lat, lon } = LocationsData[this.selectedCountry][this.selectedState].cities[city];
      this.selectedCity = city;
      this.fetchWeather(lat, lon);
    } else {
      console.error('Coordinates not found for city:', city);
    }
  }

  fetchWeather(lat: number, lon: number): void {
    if (this.selectedCity) {
      this.weatherService.getWeather({ 
        latitude: lat, 
        longitude: lon, 
        current_weather: true,
        hourly: 'temperature_2m',
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,snowfall,weather_code,wind_speed_10m,wind_direction_10m'
      }).subscribe(
        data => {
          this.weatherData = data;
          this.saveHistory(data);
          const weatherCode = this.getWeatherCondition(data.current_weather.weathercode);
          const rawSvgIcon = WeatherIcons[weatherCode] || WeatherIcons['Clear'];
          this.weatherSvgIcon = this.sanitizer.bypassSecurityTrustHtml(rawSvgIcon);
          this.error = '';
          console.log(data)

          console.log(data)
        },
        err => {
          this.error = 'Erro ao obter informações do clima.';
          console.error(err);
        }
      );
    }
  }

  saveHistory(data: any): void {
    this.historyService.addHistory({
      country: this.selectedCountry,
      state: this.selectedState,
      city: this.selectedCity,
      weatherData: data
    });
  }

  getWeatherCondition(weatherCode: number): string {
    if (weatherCode === 0) return 'Clear';
    if ([1, 2, 3].includes(weatherCode)) return 'Clouds';
    if ([45, 48].includes(weatherCode)) return 'Mist';
    if (weatherCode >= 51 && weatherCode <= 55) return 'Drizzle';
    if ([56, 57].includes(weatherCode)) return 'FreezingDrizzle';
    if (weatherCode >= 61 && weatherCode <= 65) return 'Rain';
    if ([66, 67].includes(weatherCode)) return 'FreezingRain';
    if (weatherCode >= 71 && weatherCode <= 75) return 'Snow';
    if (weatherCode === 77) return 'SnowGrains';
    if (weatherCode >= 80 && weatherCode <= 82) return 'RainShowers';
    if ([85, 86].includes(weatherCode)) return 'SnowShowers';
    if (weatherCode === 95) return 'Thunderstorm';
    if ([96, 99].includes(weatherCode)) return 'ThunderstormHail';
    return 'Clear';
  }

  goToDetails(): void {
    if (this.weatherData && this.selectedCity) {
      // Navega para a rota de detalhes com a cidade selecionada como parâmetro
      this.router.navigate(['/details'], { queryParams: { city: this.selectedCity } });
    } else {
      alert('Nenhuma cidade selecionada ou dados indisponíveis.');
    }
  }
  

  goToHistory(): void {
    this.router.navigate(['/history']);
  }
}
