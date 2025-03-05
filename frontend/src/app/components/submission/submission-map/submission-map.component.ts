import { Component, Input, OnChanges } from '@angular/core';
import { SubmissionService } from '../submission.service';
import { StatusSubmission, Submission } from '../submission.model';
import * as moment from 'moment';

@Component({
  selector: 'app-submission-map',
  templateUrl: './submission-map.component.html',
  styleUrls: ['./submission-map.component.css']
})
export class SubmissionMapComponent implements OnChanges {
  @Input() filter: string = '';
  @Input() filterFormBy: string = '';
  @Input() filterStatusBy: string = '';
  @Input() filterDate: string = '';
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
}
