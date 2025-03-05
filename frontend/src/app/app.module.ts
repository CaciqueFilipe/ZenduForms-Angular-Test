import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';


//Componente do modulo material do angular:
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './views/home/home.component';
import { RedDirective } from './directives/red.directive';
import { ForDirective } from './directives/for.directive';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { CustomersComponent } from './views/customers/customers.component';
import { SubmissionsComponent } from './views/submissions/submissions.component';
import { ReportsComponent } from './views/reports/reports.component';
import { WorkflowComponent } from './views/workflow/workflow.component';
import { FormsComponent } from './views/forms/forms.component';
import { HistoriesComponent } from './views/histories/histories.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { FormsCreateComponent } from './components/form/forms-create/forms-create.component';
import { FormsReadComponent } from './components/form/forms-read/forms-read.component';
import { BlueDirective } from './directives/blue.directive';
import { GrayDirective } from './directives/gray.directive';
import { ReportReadComponent } from './components/report/report-read/report-read.component';
import { ReportCreateComponent } from './components/report/report-create/report-create.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { InputDatepickerComponent } from './components/input-datepicker/input-datepicker.component';

import { MAT_DATE_FORMATS, NativeDateAdapter, DateAdapter } from '@angular/material/core';
import { HistoryReadComponent } from './components/history/history-read/history-read.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerReadComponent } from './components/customer/customer-read/customer-read.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { SubmissionReadComponent } from './components/submission/submission-read/submission-read.component';
import { SubmissionMapComponent } from './components/submission/submission-map/submission-map.component';
import { ReportUpdateComponent } from './components/report/report-update/report-update.component';
import { HistoryRecordReadComponent } from './components/history-record/history-record-read/history-record-read.component';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } else {
      return date.toDateString();
    }
  }
}

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RedDirective,
    ForDirective,
    CustomersComponent,
    SubmissionsComponent,
    ReportsComponent,
    WorkflowComponent,
    FormsComponent,
    HistoriesComponent,
    InputSearchComponent,
    FormsCreateComponent,
    FormsReadComponent,
    BlueDirective,
    GrayDirective,
    ReportReadComponent,
    ReportCreateComponent,
    InputDatepickerComponent,
    HistoryReadComponent,
    CustomerReadComponent,
    CustomerCreateComponent,
    SubmissionReadComponent,
    SubmissionMapComponent,
    ReportUpdateComponent,
    HistoryRecordReadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxPaginationModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en'

    },
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
