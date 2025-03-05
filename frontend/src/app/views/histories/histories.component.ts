import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.css']
})

export class HistoriesComponent implements OnInit {
  filter: string = '';
  date: string = '';
  label = "Filter a date";

  constructor() { }

  ngOnInit(): void {
  }

  inputChange(string: any) {
    this.filter = string;
  }

  dataChange(event: any) {
    if (event === '') {
      this.date = '';
      return;
    }
    this.date = moment(event).toString();
  }
}
