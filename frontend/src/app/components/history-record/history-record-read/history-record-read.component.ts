import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { HistoryRecord } from '../history-record.model';
import { HistoryRecordsService } from '../history-record.service';

@Component({
  selector: 'app-history-record-read',
  templateUrl: './history-record-read.component.html',
  styleUrls: ['./history-record-read.component.css']
})

export class HistoryRecordReadComponent implements OnChanges {
  @Input() filter: string = '';
  @Input() filterBy: string = '';
  @Input() dataSelected: HistoryRecord[] = [];
  @Output() dataSelectedSend = new EventEmitter<any>();

  checkedAll = false;
  page = 1;
  itemsPerPage = 10;
  pageLenght = (this.page * this.itemsPerPage) || 10;
  historyRecords!: HistoryRecord[];

  constructor(
    private historyRecordService: HistoryRecordsService,
  ) {
  }

  ngOnChanges(): void {
    this.historyRecordService.read().subscribe(customArray => {
      let elements = customArray;
      if (this.filter !== '') {
        elements = customArray.filter((d: any) => {
          if (this.filterBy !== '') {
            return d[this.filterBy]
              .toString()
              .toLowerCase()
              .includes(this.filter.toString().toLowerCase());
          }
          return d.tripDates.concat(
            d.startTime,
            d.vehicleId,
            d.odometerStart,
            d.odometerEnd,
            d.submissionsEmailId,
            d.submissionsTime,
          ).toLowerCase()
            .includes(this.filter.toString().toLowerCase())
        }
        );
      }
      this.historyRecords = elements;
    })
  }

  pageChange(event: any) {
    this.page = event;
    const newPageLenght = this.page * this.itemsPerPage;
    this.pageLenght = newPageLenght < this.historyRecords.length ? newPageLenght : this.historyRecords.length
  }

  checkedAllChange(event: any) {
    const valor = event.checked;
    this.historyRecords.map(d => d.check = valor);
    this.checkedElement();
  }

  checkedElement() {
    this.dataSelected = [];
    this.historyRecords.map(d => {
      if (d.check) {
        this.dataSelected.push(d)
      }
    });
    this.sendDataSelected(this.dataSelected);
  }

  deleteSelected() {
    this.dataSelected.map(d => {
      if (d.id) {
        this.historyRecordService.delete(d.id).subscribe(() => { });
      }
    });
    this.dataSelected = [];
    this.sendDataSelected(this.dataSelected);
    this.historyRecordService.showMessage("History Record deleted Successfully!");
    this.ngOnChanges();
  }

  sendDataSelected(dataSelected: HistoryRecord[] | []) {
    this.dataSelectedSend.emit(dataSelected);
  }

}
