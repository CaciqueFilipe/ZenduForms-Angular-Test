import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  filters: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  inputChange(string: any) {
    this.filters = string;
  }

  navigateToReportCreate(): void {
    this.router.navigate(['/reports/create'])
  }
}
