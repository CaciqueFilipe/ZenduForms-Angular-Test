import { Component, Input, OnChanges } from '@angular/core';
import { Form } from '../form.model';
import { FormService } from '../form.service';
import * as moment from 'moment';

const alerts = [
  {
    tipo: 'send',
    message: 'Sent successfully!'
  },
  {
    tipo: 'graph',
    message: 'Graph successfully!'
  },
  {
    tipo: 'activity',
    message: 'Activiy successfully!'
  },
  {
    tipo: 'edit',
    message: 'Edit successfully!'
  },
  {
    tipo: 'add',
    message: 'Add Form successfully!'
  },
]

@Component({
  selector: 'app-forms-read',
  templateUrl: './forms-read.component.html',
  styleUrls: ['./forms-read.component.css']
})

export class FormsReadComponent implements OnChanges {
  @Input() filters: string = '';
  forms!: Form[]
  displayedColumns = [
    'name',
    'created',
    'modified',
    'owner',
    'submissions',
    'actions'
  ]

  constructor(private formService: FormService) {
  }

  ngOnChanges(): void {
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
      let elements = forms;
      if (this.filters !== '') {
        elements = forms.filter(d =>
          d.name.concat(d.owner).toLowerCase().includes(this.filters.toLowerCase())
        );
      }
      this.forms = elements;
    })
  }

  executeAction(tipo: string) {
    const message = alerts.find(a => a.tipo === tipo)?.message || 'Action executed successfully!';
    this.formService.showMessage(message);
  }
}
