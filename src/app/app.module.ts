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
@NgModule({
  declarations: [
    AppComponent,
    AccordionComponent,
    AddNewComponent,
    CommonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BootstrapIconsModule.pick(allIcons),
    ReactiveFormsModule,
    HttpClientModule,   
    NgbNavModule,
    FormsModule
 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
