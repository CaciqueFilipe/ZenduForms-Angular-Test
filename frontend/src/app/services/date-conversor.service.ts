import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class DateConversorService {
  constructor() {
    moment.locale("America/Toronto");
  }

  dateNow() {
    const dataAtual = new Date();
    return moment(dataAtual);
  }

  dateNowToString() {
    const dataAtual = new Date();
    return moment(dataAtual).toString();
  }
}
