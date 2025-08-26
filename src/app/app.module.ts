import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionComponent } from './accordion/accordion.component';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { allIcons } from 'ng-bootstrap-icons/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddNewComponent } from './add-new/add-new.component';
import { CommonComponent } from './common/common.component';
import { ExpenseComponent } from './expense/expense.component';
import { GoalsComponent } from './goals/goals.component';
import { StatisticsModule } from './statistics/statistics.module';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    AccordionComponent,
    AddNewComponent,
    CommonComponent,
    ExpenseComponent,
    GoalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BootstrapIconsModule.pick(allIcons),
    ReactiveFormsModule,
    HttpClientModule,   
    NgbNavModule,
    FormsModule,
    StatisticsModule,
    NgChartsModule
 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
