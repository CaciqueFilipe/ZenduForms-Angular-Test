import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  customer: Customer = {
    check: false,
    companyName: '',
    customerAddress: '',
    contact: '',
    phoneNumber: '',
    openTasks: 0,
    totalCompleted: 0,
  }

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.customerService.readById(id!).subscribe((customer) => {
        this.customer = customer;
      });
    }
  }

  createCustomer() {
    this.customerService.create(this.customer).subscribe(() => {
      this.customerService.showMessage('Customer add Successfully!')
      this.router.navigate(['/customers'])
    })
  }

  saveCustomer(): void {
    if (!this.customer.companyName || this.customer.companyName === '') {
      return this.customerService.showMessage('Company Name ​​not reported!', true)
    }
    if (!this.customer.customerAddress || this.customer.customerAddress === '') {
      return this.customerService.showMessage('Customer Address ​​not reported!', true)
    }
    if (!this.customer.contact || this.customer.contact === '') {
      return this.customerService.showMessage('Contact ​​not reported!', true)
    }
    if (!this.customer.phoneNumber || this.customer.phoneNumber === '') {
      return this.customerService.showMessage('Phone Number ​​not reported!', true)
    }
    if (!this.customer.id) {
      return this.createCustomer();
    }
    this.customerService.update(this.customer).subscribe(() => {
      this.customerService.showMessage('Customer update Successfully!')
      this.router.navigate(['/customers'])
    })
  }

  delete(id: number): void {
    this.customerService.delete(id!).subscribe(() => {
      this.customerService.showMessage("Customer deleted Successfully!");
      this.router.navigate(["/customers"]);
    });
  }

  cancel(): void {
    this.router.navigate(['/customers'])
  }

}
