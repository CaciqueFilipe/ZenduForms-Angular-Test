import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: ['./input-datepicker.component.css']
})
export class InputDatepickerComponent implements OnInit {
  @Input() label: string = 'Choose a date';
  @Output() dataSend = new EventEmitter<any>();

  InputDateChange(event: any) {
    this.dataSend.emit(event.value);
  }

  constructor() { }

  ngOnInit(): void {
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

}
