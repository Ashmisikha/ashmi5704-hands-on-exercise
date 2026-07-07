import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';

  private el = inject(ElementRef<HTMLElement>);
  private originalBackground = '';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.originalBackground = this.el.nativeElement.style.backgroundColor;
    this.el.nativeElement.style.transition = 'background-color 0.2s ease, transform 0.2s ease';
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = this.originalBackground;
  }
}
