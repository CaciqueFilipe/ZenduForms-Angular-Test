import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRed]'
})
export class RedDirective {

  //Injetando a diretiva em um elemento html fora daqui:
  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#e35e6b'
   }

}
