import { Component, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { ReportService } from '../report.service';
import { Report } from '../report.model';
import { FormService } from '../../form/form.service';
import { Form } from '../../form/form.model';

@Component({
  selector: 'app-report-read',
  templateUrl: './report-read.component.html',
  styleUrls: ['./report-read.component.css']
})

export class ReportReadComponent implements OnChanges {
  @Input() filters: string = '';
  reports!: Report[];
  forms!: Form[];
  displayedColumns = [
    'name',
    'created',
    'modified',
    'owner',
    'form',
  ];

  constructor(
    private reportService: ReportService,
    private formService: FormService,
  ) {
  }

  ngOnChanges(): void {
    let arrayForms: Form[] = [];
    this.formService.read().subscribe(forms => {
      this.forms = forms;
      arrayForms = forms
    })
    this.reportService.read().subscribe(reports => {
      reports.map(report => {
        const form = arrayForms.find(f => f.id === report.formId);
        if (form) {
          report.formName = form.name;
        }
        if (report.created) {
          const dateCreated = moment(report.created)
          report.createdFormated = dateCreated.format("MMM DD, YYYY");
        }
        if (report.modified) {
          const dateModified = moment(report.modified)
          report.modifiedFormated = dateModified.format("MMM DD, YYYY");
        }
      })
      let elements = reports;
      if (this.filters !== '') {
        elements = reports.filter(d =>
          d.name.concat(d.owner, (d.formName || '')).toLowerCase().includes(this.filters.toLowerCase())
        );
      }
      this.reports = elements;
    })
  }

  deleteReport(id: any) {
    this.reportService.delete(parseInt(id)!).subscribe(() => {
      this.reportService.showMessage("Report deleted Successfully!");
      this.ngOnChanges();
    });
  }
}
