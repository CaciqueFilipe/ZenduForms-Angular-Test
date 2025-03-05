import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Form } from 'src/app/components/form/form.model';
import { FormService } from 'src/app/components/form/form.service';
import { StatusSubmission, Submission } from 'src/app/components/submission/submission.model';
import { SubmissionService } from 'src/app/components/submission/submission.service';

const alerts = [
  {
    tipo: 'export',
    message: 'Export successfully!'
  },
]

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})

export class SubmissionsComponent implements OnInit {
  filter: string = '';
  filterFormBy: string = '';
  filterStatusBy: string = '';
  filterDate: string = '';
  dataSelected: Submission[] = [];
  viewExport = false;
  label = 'Filter a date';
  mapOrList: 'list' | 'map' = 'map';

  selectStatus = StatusSubmission;
  forms!: Form[];

  constructor(
    private router: Router,
    private customerService: SubmissionService,
    private formService: FormService,
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

  inputChange(string: any) {
    this.filter = string;
  }

  dataChange(event: any) {
    if (event === '') {
      this.filterDate = '';
      return;
    }
    this.filterDate = moment(event).toString();
  }

  dataSelectedChange(dataSelected: Submission[] | []) {
    if (dataSelected.length > 0) {
      this.viewExport = true;
      return;
    }
    this.viewExport = false;
  }

  executeAction(tipo: string) {
    const message = alerts.find(a => a.tipo === tipo)?.message || 'Action executed successfully!';
    this.customerService.showMessage(message);
  }
}
