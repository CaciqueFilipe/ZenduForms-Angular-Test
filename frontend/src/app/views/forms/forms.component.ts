import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  filters: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  inputChange(string: any) {
    this.filters = string;
  }

  navigateToFormCreate(): void {
    this.router.navigate(['/forms/create'])
  }
}
