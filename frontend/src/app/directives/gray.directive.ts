import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appGray]'
})
export class GrayDirective {

  //Injetando a diretiva em um elemento html fora daqui:
  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#B8B9BC'
  }
}
