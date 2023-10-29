import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionComponent } from './accordion/accordion.component';
import { AngularComponent } from './angular/angular.component';
import { JavascriptComponent } from './javascript/javascript.component';
import { HomeComponent } from './home/home.component';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { allIcons } from 'ng-bootstrap-icons/icons';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddNewComponent } from './add-new/add-new.component';
import { HtmlComponent } from './html/html.component';
import { CssComponent } from './css/css.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { NotesComponent } from './notes/notes.component';
@NgModule({
  declarations: [
    AppComponent,
    AccordionComponent,
    AngularComponent,
    JavascriptComponent,
    HomeComponent,
    AddNewComponent,
    HtmlComponent,
    CssComponent,
    BootstrapComponent,
    NotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BootstrapIconsModule.pick(allIcons),
    ReactiveFormsModule,
    HttpClientModule,   
    NgbNavModule
 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
