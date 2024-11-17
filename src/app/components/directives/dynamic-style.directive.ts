import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[isSelected]'
})
export class DynamicStyleDirective implements OnChanges {
  @Input() isSelected: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.isSelected) {
      this.renderer.setStyle(this.el.nativeElement, 'border-radius', '20px');
      this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color 0.3s ease');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border-radius');
    }
  }
}
