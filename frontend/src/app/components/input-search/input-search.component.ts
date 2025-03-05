import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})

export class InputSearchComponent implements OnInit {

  inputSearch = '';

  constructor() { }

  ngOnInit(): void {
  }

  @Output() dataSend = new EventEmitter<any>();

  InputSearchChange(event: any) {
    this.dataSend.emit(event.target.value);
  }

}
