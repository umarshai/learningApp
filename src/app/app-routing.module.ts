import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonComponent } from './common/common.component';

const routes: Routes = [
  {path: 'home', component: CommonComponent},
  {path: '', redirectTo:'home', pathMatch:"full"},
  {path: '**', component: CommonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
