import { Directive, ElementRef, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTemperatureToggle]'
})
export class TemperatureToggleDirective implements OnChanges {
  @Input() appTemperatureToggle: 'C' | 'F' = 'C';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appTemperatureToggle']) {
      this.updateButton();
    }
  }

  private updateButton(): void {
    if (this.appTemperatureToggle === 'C') {
      this.renderer.setStyle(this.el.nativeElement, 'color', '#3a86ff');
      this.renderer.setStyle(this.el.nativeElement, 'right', '5px');
      this.renderer.setStyle(this.el.nativeElement, 'left', 'initial');
      
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'color', '#ff006e');
      this.renderer.setStyle(this.el.nativeElement, 'left', '5px');
      this.renderer.setStyle(this.el.nativeElement, 'right', 'initial');
    }
  }
}
