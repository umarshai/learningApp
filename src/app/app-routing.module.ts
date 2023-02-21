import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularComponent } from './angular/angular.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { CssComponent } from './css/css.component';
import { HomeComponent } from './home/home.component';
import { HtmlComponent } from './html/html.component';
import { JavascriptComponent } from './javascript/javascript.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'angular', component: AngularComponent},
  {path: 'javascript', component: JavascriptComponent},
  {path: 'html', component: HtmlComponent},
  {path: 'css', component: CssComponent},
  {path: 'bootstrap', component: BootstrapComponent},
  {path: '', redirectTo:'home', pathMatch:"full"},
  {path: '**', component: HomeComponent},


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
