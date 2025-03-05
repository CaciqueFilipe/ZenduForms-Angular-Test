import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../../form/form.service';
import { Form } from '../../form/form.model';
import * as moment from 'moment';
import { Report } from '../report.model';
import { ReportService } from '../report.service';
import { DateConversorService } from 'src/app/services/date-conversor.service';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.css']
})
export class ReportCreateComponent implements OnInit {
  forms!: Form[];

  report: Report = {
    name: '',
    created: '',
    modified: '',
    owner: '',
    formId: 0,
    formName: ''
  }

  constructor(
    private formService: FormService,
    private reportService: ReportService,
    private router: Router,
    private conversorDate: DateConversorService
  ) { }

  ngOnInit(): void {
    this.formService.read().subscribe(forms => {
      forms.map(f => {
        if (f.created) {
          const dateCreated = moment(f.created)
          f.createdFormated = dateCreated.format("MMM DD, YYYY");
        }
        if (f.modified) {
          const dateModified = moment(f.modified)
          f.modifiedFormated = dateModified.format("MMM DD, YYYY");
        }
      })
      this.forms = forms;
    })
  }

  saveReport() {
    if (!this.report.name || this.report.name === '') {
      return this.reportService.showMessage('Name ​​not reported!', true)
    }
    if (!this.report.formId || this.report.formId === 0) {
      return this.reportService.showMessage('Select Form ​​not reported!', true)
    }
    if (!this.report.owner || this.report.owner === "") {
      return this.reportService.showMessage('Owner Form ​​not reported!', true)
    }
    const formId = Number(this.report.formId);
    const form = this.forms.find(f => f.id && f.id === formId);
    this.report.formName = form?.name || '';
    this.report.formId = form?.id;
    this.report.created = this.conversorDate.dateNowToString();
    this.report.modified = this.conversorDate.dateNowToString();
    this.reportService.create(this.report).subscribe(() => {
      this.reportService.showMessage('Report add Successfully!')
      this.router.navigate(['/reports'])
    });
  }

  cancel(): void {
    this.router.navigate(['/reports'])
  }
}
