import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonComponent } from './common/common.component';

import { ExpenseComponent } from './expense/expense.component';
import { GoalsComponent } from './goals/goals.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  // { path: 'home', component: CommonComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'goals', component: GoalsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '', redirectTo: 'expense', pathMatch: 'full' },
  { path: '**', component: ExpenseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
