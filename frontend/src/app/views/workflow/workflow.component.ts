import { Component, OnInit } from '@angular/core';
import { Workflow } from './workflow.model';
import { WorkflowService } from './workflow.service';
import { Form } from 'src/app/components/form/form.model';
import { FormService } from 'src/app/components/form/form.service';
import * as moment from 'moment';
import { DateConversorService } from 'src/app/services/date-conversor.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {

  workflows!: Workflow[];
  forms!: Form[];
  label = "Set Due Date for Form"

  workflow: Workflow = {
    geoTabId: 0,
    formId: 0,
    date: '',
    created: '',
    modified: '',
  }

  constructor(
    private workflowService: WorkflowService,
    private formService: FormService,
    private conversorDate: DateConversorService
  ) { }

  ngOnInit(): void {
    this.formService.read().subscribe(forms => {
      this.forms = forms;
    })
    this.workflowService.read().subscribe(workflows => {
      this.workflows = workflows;
    })
  }

  saveWorkflow() {
    if (!this.workflow.geoTabId || this.workflow.geoTabId === 0) {
      return this.workflowService.showMessage('Geo Rule ​​not selected!', true)
    }
    if (!this.workflow.formId || this.workflow.formId === 0) {
      return this.workflowService.showMessage('Select Form ​​not selected!', true)
    }
    if (!this.workflow.date || this.workflow.date === '') {
      return this.workflowService.showMessage('Date for Form ​​not reported!', true)
    }

    this.workflow.created = this.conversorDate.dateNowToString();
    this.workflowService.create(this.workflow).subscribe(() => {
      this.workflowService.showMessage('Workflow add Successfully!');
    })
  }

  dataChange(event: any) {
    if (event === '') {
      this.workflow.date = '';
      return;
    }
    this.workflow.date = moment(event).toString();
  }
}
