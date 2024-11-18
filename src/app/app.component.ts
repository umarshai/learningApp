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
 savedDate;
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
    this.savedDate = array.filter((demo)=>{ return (demo.type== 'home' && demo.question == 'targetDate')});
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
    this.updateCountdown(this.savedDate[0].answer);
    console.log(this.routes);
  });
  }
  //for countdown
  selectedDate: string | null = null;
  daysLeft: number | null = null;

  

  updateCountdown(v: Date): void {
  

    // Set the target date to December 22 of the current year
const targetDate = new Date(v);  // Month is 0-based (11 = December)

// Get today's date with time reset to 00:00:00
const today = new Date().setHours(0, 0, 0, 0); // Reset time for accurate day difference


const timeDifference = targetDate.getTime() - today;
this.daysLeft = timeDifference;
    if (timeDifference < 0) {
      this.daysLeft = 0; // If the selected date is in the past
    } else {
      this.daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    }
  }
}
