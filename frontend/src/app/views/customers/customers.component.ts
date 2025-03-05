import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/components/customer/customer.model';
import { CustomerService } from 'src/app/components/customer/customer.service';

const alerts = [
  {
    tipo: 'export',
    message: 'Export successfully!'
  },
]

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  filter: string = '';
  filterBy: string = '';
  dataSelected: Customer[] = [];
  viewExport = false;

  selectOptions = [
    {
      label: "Company Name",
      value: "companyName",
    },
    {
      label: "Customer Address",
      value: "customerAddress",
    },
    {
      label: "Contact",
      value: "contact",
    },
    {
      label: "Phone Number",
      value: "phoneNumber",
    },
    {
      label: "Open Tasks",
      value: "openTasks",
    },
    {
      label: "Total Completed",
      value: "totalCompleted",
    },
  ];

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
  }

  inputChange(string: any) {
    this.filter = string;
  }

  dataSelectedChange(dataSelected: Customer[] | []) {
    if (dataSelected.length > 0) {
      this.viewExport = true;
      return;
    }
    this.viewExport = false;
  }

  navigateToCustomerCreate() {
    this.router.navigate(['/customers/create'])
  }

  executeAction(tipo: string) {
    const message = alerts.find(a => a.tipo === tipo)?.message || 'Action executed successfully!';
    this.customerService.showMessage(message);
  }
}
