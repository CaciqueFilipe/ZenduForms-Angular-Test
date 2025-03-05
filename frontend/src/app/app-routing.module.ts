import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { CustomersComponent } from './views/customers/customers.component';
import { SubmissionsComponent } from './views/submissions/submissions.component';
import { ReportsComponent } from './views/reports/reports.component';
import { WorkflowComponent } from './views/workflow/workflow.component';
import { HistoriesComponent } from './views/histories/histories.component';
import { FormsComponent } from './views/forms/forms.component';
import { FormsCreateComponent } from './components/form/forms-create/forms-create.component';
import { ReportCreateComponent } from './components/report/report-create/report-create.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { ReportUpdateComponent } from './components/report/report-update/report-update.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "forms",
    component: FormsComponent
  },
  {
    path: "forms/create",
    component: FormsCreateComponent
  },
  {
    path: "forms/update/:id",
    component: FormsCreateComponent
  },
  {
    path: "customers",
    component: CustomersComponent
  },
  {
    path: "customers/create",
    component: CustomerCreateComponent
  },
  {
    path: "submissions",
    component: SubmissionsComponent
  },
  {
    path: "histories",
    component: HistoriesComponent
  },
  {
    path: "reports",
    component: ReportsComponent
  },
  {
    path: "reports/create",
    component: ReportCreateComponent
  },
  {
    path: "reports/update",
    component: ReportUpdateComponent
  },
  {
    path: "reports/update/:id",
    component: ReportUpdateComponent
  },
  {
    path: "workflow",
    component: WorkflowComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
