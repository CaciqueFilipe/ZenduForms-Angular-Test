import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-read',
  templateUrl: './customer-read.component.html',
  styleUrls: ['./customer-read.component.css']
})

export class CustomerReadComponent implements OnChanges {
  @Input() filter: string = '';
  @Input() filterBy: string = '';
  @Input() dataSelected: Customer[] = [];
  @Output() dataSelectedSend = new EventEmitter<any>();

  checkedAll = false;
  page = 1;
  itemsPerPage = 10;
  pageLenght = (this.page * this.itemsPerPage) || 10;
  customers!: Customer[];

  constructor(
    private customerService: CustomerService,
  ) {
  }

  ngOnChanges(): void {
    this.customerService.read().subscribe(customArray => {
      let elements = customArray;
      if (this.filter !== '') {
        elements = customArray.filter((d: any) => {
          if (this.filterBy !== '') {
            return d[this.filterBy]
              .toString()
              .toLowerCase()
              .includes(this.filter.toString().toLowerCase());
          }
          return d.companyName.concat(
            d.customerAddress,
            d.contact,
            d.phoneNumber,
            d.openTasks.toString(),
            d.totalCompleted.toString()
          ).toLowerCase()
            .includes(this.filter.toString().toLowerCase())
        }
        );
      }
      this.customers = elements;
    })
  }

  pageChange(event: any) {
    this.page = event;
    const newPageLenght = this.page * this.itemsPerPage;
    this.pageLenght = newPageLenght < this.customers.length ? newPageLenght : this.customers.length
  }

  checkedAllChange(event: any) {
    const valor = event.checked;
    this.customers.map(d => d.check = valor);
    this.checkedElement();
  }

  checkedElement() {
    this.dataSelected = [];
    this.customers.map(d => {
      if (d.check) {
        this.dataSelected.push(d)
      }
    });
    this.sendDataSelected(this.dataSelected);
  }

  deleteSelected() {
    this.dataSelected.map(d => {
      if (d.id) {
        this.customerService.delete(d.id).subscribe(() => { });
      }
    });
    this.dataSelected = [];
    this.sendDataSelected(this.dataSelected);
    this.customerService.showMessage("Customers deleted Successfully!");
    this.ngOnChanges();
  }

  sendDataSelected(dataSelected: Customer[] | []) {
    this.dataSelectedSend.emit(dataSelected);
  }
}
