import { Component, OnInit } from '@angular/core';
import { FormService } from '../../form/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Form } from '../form.model';
import { DateConversorService } from 'src/app/services/date-conversor.service';

@Component({
  selector: 'app-forms-create',
  templateUrl: './forms-create.component.html',
  styleUrls: ['./forms-create.component.css']
})
export class FormsCreateComponent implements OnInit {

  form: Form = {
    name: '',
    created: '',
    modified: '',
    owner: '',
    submissions: 0
  }

  constructor(
    private formService: FormService,
    private router: Router,
    private route: ActivatedRoute,
    private conversorDate: DateConversorService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.formService.readById(id!).subscribe((form) => {
        this.form = form;
      });
    }
  }

  createForm() {
    this.form.created = this.conversorDate.dateNowToString();
    this.formService.create(this.form).subscribe(() => {
      this.formService.showMessage('Form add Successfully!')
      this.router.navigate(['/forms'])
    })
  }

  saveForm(): void {
    if (!this.form.name || this.form.name === '') {
      return this.formService.showMessage('Name ​​not reported!', true)
    }
    if (!this.form.owner || this.form.owner === '') {
      return this.formService.showMessage('Owner ​​not reported!', true)
    }
    if (!this.form.id) {
      return this.createForm();
    }
    this.form.modified = this.conversorDate.dateNowToString();
    this.formService.update(this.form).subscribe(() => {
      this.formService.showMessage('Form update Successfully!')
      this.router.navigate(['/forms'])
    })
  }

  delete(id: number): void {
    this.formService.delete(id!).subscribe(() => {
      this.formService.showMessage("Form deleted Successfully!");
      this.router.navigate(["/forms"]);
    });
  }

  cancel(): void {
    this.router.navigate(['/forms'])
  }
}