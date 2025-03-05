import { Component, Input, OnChanges } from '@angular/core';
import { History } from '../history.model';
import { Customer } from '../../customer/customer.model';
import { HistoryService } from '../history.service';
import { FormService } from '../../form/form.service';
import { CustomerService } from '../../customer/customer.service';
import * as moment from 'moment';
import { Form } from '../../form/form.model';

@Component({
  selector: 'app-history-read',
  templateUrl: './history-read.component.html',
  styleUrls: ['./history-read.component.css']
})
export class HistoryReadComponent implements OnChanges {
  @Input() filter: string = '';
  @Input() date: string = '';

  page = 1;
  itemsPerPage = 10;
  pageLenght = this.page * this.itemsPerPage;

  histories!: History[];
  forms!: Form[];
  customers!: Customer[];
  displayedColumns = [
    'audit',
    'subject',
    'action',
    'contact',
    'customer',
    'form'
  ]

  constructor(
    private historyService: HistoryService,
    private formService: FormService,
    private customerService: CustomerService,
  ) {
  }

  ngOnChanges(): void {
    this.formService.read().subscribe(forms => {
      this.forms = forms;
    });
    this.customerService.read().subscribe(forms => {
      this.customers = forms;
    });
    this.historyService.read().subscribe(historys => {
      historys.map(history => {
        const form = this.forms.find(f => f.id === history.formId);
        if (form) {
          history.form = form.name;
        }
        const customer = this.customers.find(f => f.id === history.customerId);
        if (customer) {
          history.customer = customer.companyName;
        }
        if (history.audit) {
          const dateCreated = moment(history.audit)
          history.auditFormated = dateCreated.format("MMM DD H:m A, YYYY");
        }
      })
      let elements = historys;
      if (this.filter !== '') {
        elements = historys.filter(d =>
          d.subject.concat(d.action, (d.form || ''), (d.customer || '')).toLowerCase().includes(this.filter.toLowerCase())
        );
      }
      if (this.date !== '' && this.date !== "Invalid date") {
        elements = historys.filter(d => {
          const data = moment(d.audit).format("MMM DD, YYYY");
          const dateFormated = moment(this.date).format("MMM DD, YYYY")
          if (data === dateFormated) {
            return d;
          }
          return false
        });
      }
      this.histories = elements;
    })
  }

  pageChange(event: any) {
    this.page = event;
    const newPageLenght = this.page * this.itemsPerPage;
    this.pageLenght = newPageLenght < this.histories.length ? newPageLenght : this.histories.length
  }
}
