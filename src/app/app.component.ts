import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DbService } from './service/db.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  constructor (private dbService: DbService){
    this.getNew();
  }
  routes;

  title = 'LearningApp';
  getNew(){ 
    this.dbService.getData()
  .pipe(map (response=>{
    var array:any=[];
    for(const key in response)
    {
      if(response.hasOwnProperty(key))
      {
        array.push({ ...response[key] , id:key});   
      } 
    }  
    array=array.filter((demo)=>{ return (demo.type== 'home' && demo.question == 'routes')});
    return array;
  }
  ))
  .subscribe((data)=>{
    // Example string received from the database
    const jsonString = data[0].answer;
    // Parse the JSON string into a JavaScript array of objects
    const dataArray = JSON.parse(jsonString);
    this.routes = dataArray;
    console.log(this.routes);
  });
  }
}
