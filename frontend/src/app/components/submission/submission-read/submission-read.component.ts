import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { StatusSubmission, Submission } from '../submission.model';
import { SubmissionService } from '../submission.service';
import * as moment from 'moment';

@Component({
  selector: 'app-submission-read',
  templateUrl: './submission-read.component.html',
  styleUrls: ['./submission-read.component.css']
})
export class SubmissionReadComponent implements OnChanges {
  @Input() filter: string = '';
  @Input() filterFormBy: string = '';
  @Input() filterStatusBy: string = '';
  @Input() filterDate: string = '';
  @Input() dataSelected: Submission[] = [];
  @Output() dataSelectedSend = new EventEmitter<any>();

  checkedAll = false;
  page = 1;
  itemsPerPage = 10;
  pageLenght = (this.page * this.itemsPerPage) || 10;
  submissions!: Submission[];


  constructor(
    private submissionService: SubmissionService,
  ) {
  }

  ngOnChanges(): void {
    this.submissionService.read().subscribe((customArray: Submission[]) => {
      let elements = customArray;
      elements.map(e => {
        if (e.dueDate) {
          const dateCreated = moment(e.dueDate)
          e.dueDateFormated = dateCreated.format("MMM DD, H:m A");
        }
        const status = StatusSubmission.find(s => s.status === e.status);
        e.statusName = status ? status.description : '';
      })
      if (this.filter !== '') {
        elements = customArray.filter((d: any) => {
          return d.task.concat(
            d.from,
            d.to,
            d.customerAddress,
            d.dueDate,
            d.status.toString()
          ).toLowerCase()
            .includes(this.filter.toString().toLowerCase())
        });
      }
      if (this.filterStatusBy !== '') {
        elements = customArray.filter((d: Submission) => {
          return d.status === parseInt(this.filterStatusBy)
        });
      }
      if (this.filterDate !== '' && this.filterDate !== "Invalid date") {
        elements = customArray.filter(d => {
          const data = moment(d.dueDate).format("MMM DD, YYYY");
          const dateFormated = moment(this.filterDate).format("MMM DD, YYYY")
          if (data === dateFormated) {
            return d;
          }
          return false
        });
      }
      this.submissions = elements;
    })
  }

  pageChange(event: any) {
    this.page = event;
    const newPageLenght = this.page * this.itemsPerPage;
    this.pageLenght = newPageLenght < this.submissions.length ? newPageLenght : this.submissions.length
  }

  checkedAllChange(event: any) {
    const valor = event.checked;
    this.submissions.map(d => d.check = valor);
    this.checkedElement();
  }

  checkedElement() {
    this.dataSelected = [];
    this.submissions.map(d => {
      if (d.check) {
        this.dataSelected.push(d)
      }
    });
    this.sendDataSelected(this.dataSelected);
  }

  deleteSelected() {
    this.dataSelected.map(d => {
      if (d.id) {
        this.submissionService.delete(d.id).subscribe(() => { });
      }
    });
    this.dataSelected = [];
    this.sendDataSelected(this.dataSelected);
    this.submissionService.showMessage("Submissions deleted Successfully!");
    this.ngOnChanges();
  }

  sendDataSelected(dataSelected: Submission[] | []) {
    this.dataSelectedSend.emit(dataSelected);
  }
}
