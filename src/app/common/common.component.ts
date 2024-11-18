import { Component } from '@angular/core';
import { DbService } from '../service/db.service';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent {
  bank = '';
  type = "Angular";  
  route = 'home'
  constructor( private dbService:DbService,private router: ActivatedRoute) {
    this.router.url.subscribe( (r)=> {
      this.route = r[0].path;
      this.type = this.route;
      this.getNew(this.route);
      });
  }
  cchange(value)
  {
    setTimeout(() => {
      this.getNew(this.route);
    }, 300)   
  }
  getNew(route: string){ 
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
    array=array.filter((demo)=>{ return demo.type== route });
    const cDate= array.filter((demo)=>{ return (demo.type== 'home' && demo.question == 'targetDate')});

    this.updateCountdown(cDate[0].answer);

    return array;
  }
  ))
  .subscribe((data)=>{ 
    this.bank=data });
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
