import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBlue]'
})
export class BlueDirective {

  //Injetando a diretiva em um elemento html fora daqui:
  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#2188D9'
  }

}
