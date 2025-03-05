import { Component, OnInit } from '@angular/core';
import { FormService } from '../../form/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateConversorService } from 'src/app/services/date-conversor.service';
import { ReportService } from '../report.service';
import { Form } from '../../form/form.model';
import { Report } from '../report.model';
import * as moment from 'moment';
import { HistoryRecord } from '../../history-record/history-record.model';

const alerts = [
  {
    tipo: 'print',
    message: 'Print successfully!'
  },
  {
    tipo: 'export',
    message: 'Export successfully!'
  },
]

@Component({
  selector: 'app-report-update',
  templateUrl: './report-update.component.html',
  styleUrls: ['./report-update.component.css']
})
export class ReportUpdateComponent implements OnInit {
  forms!: Form[];
  report: Report = {
    name: '',
    created: '',
    modified: '',
    owner: '',
    formId: 0,
    formName: ''
  }
  measurement = ''
  dateFormated = ''
  timezone = '';
  viewExport = false;
  filter: string = '';
  filterBy: string = '';
  dataSelected: HistoryRecord[] = [];

  selectOptions = [
    {
      label: "Trip Date (Question 4)",
      value: "tripDates",
    },
    {
      label: "Start Time(Question 3)",
      value: "startTime",
    },
    {
      label: "Vehicle ID(Question 2)",
      value: "vehicleId",
    },
    {
      label: "Odometer Start",
      value: "odometerStart",
    },
    {
      label: "Odometer End",
      value: "odometerEnd",
    },
    {
      label: "Submissions Email ID",
      value: "submissionsEmailId",
    },
    {
      label: "Submissions Time",
      value: "submissionsTime",
    },
  ];

  checkedAll = false;
  page = 1;
  itemsPerPage = 10;
  pageLenght = (this.page * this.itemsPerPage) || 10;

  constructor(
    private reportService: ReportService,
    private formService: FormService,
    private router: Router,
    private route: ActivatedRoute,
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
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.reportService.readById(id!).subscribe((report) => {
        this.report = report;
        const formId = Number(report.formId);
        const form = this.forms.find(f => f.id && f.id === formId);
        this.report.formName = form?.name || '';
      });
    }
  }

  saveReport() {
    this.router.navigate(['/reports'])
  }

  cancel(): void {
    this.router.navigate(['/reports'])
  }

  inputChange(string: any) {
    this.filter = string;
  }

  dataSelectedChange(dataSelected: HistoryRecord[] | []) {
    if (dataSelected.length > 0) {
      this.viewExport = true;
      return;
    }
    this.viewExport = false;
  }

  executeAction(tipo: string) {
    const message = alerts.find(a => a.tipo === tipo)?.message || 'Action executed successfully!';
    this.reportService.showMessage(message);
  }
}
