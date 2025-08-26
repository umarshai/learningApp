import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonComponent } from './common/common.component';

import { ExpenseComponent } from './expense/expense.component';
import { GoalsComponent } from './goals/goals.component';

const routes: Routes = [
  { path: 'home', component: CommonComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'goals', component: GoalsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: CommonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
