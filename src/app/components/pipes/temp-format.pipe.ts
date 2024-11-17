import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureFormat'
})
export class TemperatureFormatPipe implements PipeTransform {
  transform(value: number, unit: 'C' | 'F' = 'C'): string {
    if (value == null) {
      return '';
    }
    if (unit === 'F') {
      return `${(value * 9 / 5 + 32).toFixed(1)} °F`;
    }
    return `${value.toFixed(1)} °C`;
  }
}
